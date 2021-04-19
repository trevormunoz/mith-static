#!/usr/bin/env node

// This script contains the class Persistor for reshaping JSON from the Airtable API into 
// normalized JSON objects that we can persist to the application as static data.

// We recommend running this script via a package manager (e.g. npm) using `npm run persist`
// You can persist a single table by passing its name as a parameter, e.g. `npm run persist -- people`

require("dotenv").config()
const fs = require('fs')
const path = require('path')
const Airtable = require('airtable')

class Persistor {
  constructor() {
    const airtableKey = process.env.AIRTABLE_API_KEY
    if (! airtableKey) {
      console.error('Please add AIRTABLE_API_KEY to your environment or .env file!')
      process.exit()
    }
    this.at = new Airtable({apiKey: airtableKey})    
  }

  get mithBase() {
    if (this._mithBase) return this._mithBase
    const baseId = process.env.AIRTABLE_MITH_BASE_ID
    if (! baseId) {
      console.error('Please add AIRTABLE_MITH_BASE_ID to your environment or .env file!')
      process.exit()
    }
    this._mithBase = this.at.base(baseId)
    return this._mithBase
  }

  get people() {
    if (this._people) return this._people
    this._people = this.getTable(this.mithBase, 'People')
    return this._people
  }

  get groups() {
    if (this._groups) return this._groups
    this._groups = this.getTable(this.mithBase, 'Groups')
    return this._groups
  }

  get research() {
    if (this._research) return this._research
    this._research = this.getTable(this.mithBase, 'Research')
    return this._research
  }

  get identities() {
    if (this._identities) return this._identities
    this._identities = this.getTable(this.mithBase, 'Identities')
    return this._identities
  }

  get links() {
    if (this._links) return this._links
    this._links = this.getTable(this.mithBase, 'Links')
    return this._links
  }

  get partnersAndSponsors() {
    if (this._partnersAndSponsors) return this._partnersAndSponsors
    this._partnersAndSponsors = this.getTable(this.mithBase, 'Partners_Sponsors')
    return this._partnersAndSponsors
  }

  get events() {
    if (this._events) return this._events
    this._events = this.getTable(this.mithBase, 'Events')
    return this._events
  }

  get types() {
    if(this._types) return this._types
    this._types = this.getTable(this.mithBase, 'Types')
    return this._types
  }

  get postsBase() {
    const baseId = process.env.AIRTABLE_POSTS_BASE_ID
    if (! baseId) {
      console.error('Please add AIRTABLE_POSTS_BASE_ID to your environment or .env file!')
      process.exit()
    }
    return this.at.base(baseId)
  }

  get posts() {
    if (this._posts) return this._posts
    this._posts = this.getTable(this.postsBase, 'Posts')
    return this._posts
  }

  writeJson(o, filename) {
    const fullPath = path.resolve(__dirname, '../static/data/', filename)
    fs.writeFileSync(fullPath, JSON.stringify(o, null, 2) + '\n')
    console.log(`wrote ${fullPath}`)
  }

  getTable(base, table) {
    return new Promise((resolve, reject) => {
      const things = {}
      base(table).select()
        .eachPage(
          async (records, nextPage) => {
            for (const r of records) {
              things[r.id] = r
            }
            nextPage()
          },
          (error) => {
            if (error) {
              console.log(`error while fetching from ${table}: ${error}`)
              reject(error)
            } else {
              resolve(things)
            }
          }
        )
    })
  }
  
  async persistPeople() {  
    try {
      const people = await this.people
      const groups = await this.groups
      const identities = await this.identities
  
      const staff = []
  
      for (const persId in people) {
        const person = people[persId]
        const persInfo = person.fields
        
        // People Groups
        const persGroups = person.get('people groups')
        if (!persGroups) continue
        const resolvedGroups = persGroups.map(groupId => {
          return groups[groupId].get('group name')
        })
  
        persInfo['people groups'] = resolvedGroups

        // Past Identities - Date Spans
        const linkedIdentities = person.get('linked identities')
        if (linkedIdentities) {
          const resolvedLinkedIdentities = linkedIdentities.reduce((acc, identityId) => {
            const identity = identities[identityId]
            const title = identity.get('title')
            if (!acc[title] && identity.get('start') && identity.get('end')) {
              acc[title] = {
                title,
                start: identity.get('start'),
                end: identity.get('end'),
                id: identity.get('id')
              }
            }
            return acc
          }, {})
          
          persInfo['linked identities'] = Object.values(resolvedLinkedIdentities)
        }

        // Current Identities
        const currentIdentities = (person.get('identities as current') || []).map(
          id => identities[id].fields
        )

        persInfo['current identities'] = currentIdentities

        staff.push(persInfo)
      }
  
      this.writeJson(staff, 'people.json')
    } catch(e) {
      throw new Error(e)
    }
  }

  async persistGroups() {
    try {
      const groupsData = await this.groups
  
      const groups = []
  
      for (const groupId in groupsData) {
        const group = groupsData[groupId]
  
        const groupInfo = {
          group_name: group.get('group name'),
          type: group.get('type'),
          sort: group.get('sort'),
          slug: group.get('slug')
        }
        groups.push(groupInfo)
      }
  
      this.writeJson(groups, 'groups.json')
    } catch(e) {
      throw new Error(e)
    }
  }
  
  async persistPosts() {
    try {
      const postsData = await this.posts
  
      const posts = []
  
      for (const postId in postsData) {
        const post = postsData[postId]
  
        const postInfo = post.fields
        posts.push(postInfo)
      }
  
      this.writeJson(posts, 'posts.json')
    } catch(e) {
      throw new Error(e)
    }
  }
  
  async persistResearch() {
    try {
      const researchItems = await this.research
      const people = await this.people
      const identities = await this.identities
      const links = await this.links
      const partnersAndSponsors = await this.partnersAndSponsors
      const events = await this.events
  
      const research = []
  
      for (const researchItemId in researchItems) {
        const researchItem = researchItems[researchItemId]
  
        // Internal and External Participants
        const intParticipants = (researchItem.get('linked internal participant affiliations') || []).map(
          id => identities[id].fields
        )

        for (const participant of intParticipants) {
          const person = people[participant['linked person'][0]]
          participant.name = person.get('name')
          participant.slug = person.get('id')
        }
  
        const extParticipants = (researchItem.get('linked external participant affiliations') || []).map(
          id => identities[id].fields
        )
  
        for (const participant of extParticipants) {
          const person = people[participant['linked person'][0]]
          participant.name = person.get('name')          
        }
  
        researchItem.fields.participants = intParticipants.concat(extParticipants)

        // Directors
        const directors = (researchItem.get('linked director affiliations') || []).map(
          id => identities[id].fields
        )

        for (const director of directors) {
          const person = people[director['linked person'][0]]
          director.name = person.get('name')
          director.slug = person.get('id')
        }

        researchItem.fields.directors = directors

        // Links
        researchItem.fields.links = (researchItem.get('linked links') || []).map(
          id => links[id].fields
        )

        // Partners_Sponsors
        researchItem.fields.partners = (researchItem.get('linked partners') || []).map(
          id => partnersAndSponsors[id].fields
        )

        researchItem.fields.sponsors = (researchItem.get('linked sponsors') || []).map(
          id => partnersAndSponsors[id].fields
        )

        // Events
        researchItem.fields.events = (researchItem.get('linked events') || []).map(
          id => events[id].fields
        )
  
        research.push(researchItem.fields)
      }
  
      this.writeJson(research, 'research.json')
    } catch(e) {
      throw new Error(e)
    }
  }

  async persistEvents() {
    try {
      const eventsItems = await this.events
      const research = await this.research
      const people = await this.people
      const identities = await this.identities
      const links = await this.links
      const partnersAndSponsors = await this.partnersAndSponsors
      const types = await this.types
  
      const events = []
      
      for (const eventsItemId in eventsItems) {
        const eventsItem = eventsItems[eventsItemId]

        // Speakers
        const speakers = (eventsItem.get('speaker affiliations') || []).map(
          id => identities[id].fields
        )

        for (const speaker of speakers) {
          const person = people[speaker['linked person'][0]]
          speaker.name = person.get('name')
          speaker.slug = person.get('id')
          speaker.headshot = person.get('headshot')
          speaker.twitter = person.get('twitter')
          speaker.website = person.get('website')
        }

        eventsItem.fields.speakers = speakers

        // Participants
        const participants = (eventsItem.get('linked participant affiliations') || []).map(
          id => identities[id].fields
        )

        for (const participant of participants) {
          const person = people[participant['linked person'][0]]
          participant.name = person.get('name')
          participant.slug = person.get('id')
        }
  
        eventsItem.fields.participants = participants

        // Links
        eventsItem.fields.links = (eventsItem.get('linked links') || []).map(
          id => links[id].fields
        )

        // Partners_Sponsors
        eventsItem.fields.partners = (eventsItem.get('partners') || []).map(
          id => partnersAndSponsors[id].fields
        )

        eventsItem.fields.sponsors = (eventsItem.get('sponsors') || []).map(
          id => partnersAndSponsors[id].fields
        )

        // Research Items
        eventsItem.fields.research = (eventsItem.get('linked research item') || []).map(
          id => research[id].fields
        )
  
        // Types
        eventsItem.fields.types = (eventsItem.get('event types') || []).map(
          id => types[id].fields
        )

        events.push(eventsItem.fields)
      }
  
      this.writeJson(events, 'events.json')
    } catch(e) {
      throw new Error(e)
    }
  }

}

const persistor = new Persistor()
switch (process.argv[2]) {
  case 'people':
    persistor.persistPeople()
    break
  case 'groups':
    persistor.persistGroups()
    break
  case 'posts':
    persistor.persistPosts()
    break
  case 'research':
    persistor.persistResearch()
    break
  case 'events':
    persistor.persistEvents()
    break
  default:
    persistor.persistPeople()
    persistor.persistGroups()
    persistor.persistPosts()
    persistor.persistResearch()
    persistor.persistEvents()
}
