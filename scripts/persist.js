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

  get partnersAndSponsor() {
    if (this._partnersAndSponsor) return this._partnersAndSponsor
    this._partnersAndSponsor = this.getTable(this.mithBase, 'Partners_Sponsors')
    return this._partnersAndSponsor
  }

  get events() {
    if (this._events) return this._events
    this._events = this.getTable(this.mithBase, 'Events')
    return this._events
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
  
        const persGroups = person.get('people groups')
        if (!persGroups) continue
        const resolvedGroups = persGroups.map(groupId => {
          return groups[groupId].get('group name')
        })
  
        persInfo['people groups'] = resolvedGroups

        const linkedIdentities = person.get('linked identities')
        if (linkedIdentities) {
          const resolvedLinkedIdentities = linkedIdentities.reduce((acc, identityId) => {
            const identity = identities[identityId]
            const title = identity.get('title')
            if (!acc[title]) {
              acc[title] = {
                title,
                start: identity.get('start'),
                end: identity.get('end')
              }
            }
            return acc
          }, {})
          
          persInfo['linked identities'] = Object.values(resolvedLinkedIdentities)
        }

        staff.push(persInfo)
      }
  
      this.writeJson(staff, 'people.json')
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
      const partnersAndSponsor = await this.partnersAndSponsor
      const events = await this.events
  
      const research = []
  
      for (const researchItemId in researchItems) {
        const researchItem = researchItems[researchItemId]
  
        // Get internal and external participants
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

        // get directors
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
          id => partnersAndSponsor[id].fields
        )

        researchItem.fields.sponsors = (researchItem.get('linked sponsors') || []).map(
          id => partnersAndSponsor[id].fields
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

}

const persistor = new Persistor()
switch (process.argv[2]) {
  case 'people':
    persistor.persistPeople()
    break
  case 'posts':
    persistor.persistPosts()
    break
  case 'research':
    persistor.persistResearch()
    break
  default:
    persistor.persistPeople()
    persistor.persistPosts()
    persistor.persistResearch()
}
