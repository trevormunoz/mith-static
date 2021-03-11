const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makePosts(createPage, graphql, pathPrefix)
  await makePostIndex(createPage, graphql, pathPrefix)
  await makeResearch(createPage, graphql, pathPrefix)
  await makeResearchIndex(createPage, graphql, pathPrefix)
  //await makeEvents(createPage, graphql, pathPrefix)
  //await makeEventIndex(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtablePeopleTable(filter: {table: {eq: "People"}, data: {
        people_groups: {
          elemMatch: {
            data: {
              group_name: {nin: ["Affiliates", "Past Affiliates"]}
            }
          }
        }
      }
      }) {
        nodes {
          data {
            bio {
              childMarkdownRemark {
                html
              }
            }
            website
            twitter
            title
            people_groups {
              data {
                group_name
              }
            }
            research_interests
            phone
            name
            email
            date_spans {
              data {
                date_span
              }
            }
            bio_external
            id
            headshot {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 500, maxHeight: 500, fit: COVER, srcSetBreakpoints: [200, 250, 500], quality: 100, background: "rgba(255,255,255,0)") {
                    src
                    srcSet
                    aspectRatio
                    sizes
                    base64
                  }
                }
              }
            }
          }
        }
      }
    }  
  `)

  for (const node of results.data.allAirtablePeopleTable.nodes) {
    const person = node.data
    createPage({
      path: `/people/${person.id}/`,
      component: require.resolve(`./src/templates/person.js`),
      context: {
        ...person
      }
    })
  }
}

async function makePosts(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fields: {sourceName: {eq: "news"}}
        }
      ) {
        nodes {
          fileAbsolutePath
          html
        }
      }
    }
  `)
  
  for (const post of results.data.allMarkdownRemark.nodes) {
    const slug = path.basename(post.fileAbsolutePath, '.md')
    createPage({
      path: `/news/${slug}/`,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug,
        ...post
      }
    })
  }
}

async function makePostIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fields: {sourceName: {eq: "news"}}
        }
      ) {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numPosts = results.data.allMarkdownRemark.pageInfo.itemCount
  const postsPerPage = 25
  const numPages = Math.ceil(numPosts / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/news` : `/news/${i + 1}`,
      component: path.resolve("./src/templates/post-index.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearchIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtableResearchTable(
        filter: {
          table: {eq: "Research"}
        }
      ) {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allAirtableResearchTable.pageInfo.itemCount
  const itemsPerPage = 25
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/research` : `/research/${i + 1}/`,
      component: path.resolve("./src/templates/research-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearch(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtableResearchTable(
        filter: {
          table: {eq: "Research"}
        }
      ) {
        nodes {
          data {
            id
            slug
            title
            description {
              childMarkdownRemark {
                html
              }
            }
            excerpt {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  fluid {
                    src
                    srcSet
                    aspectRatio
                    sizes
                    base64
                  }
                }
              }
            }
            twitter_account
            twitter_hashtag
            year_start
            month_start
            year_end
            month_end        
            participants: linked_participants {
              data {
                name
                title
                department
                affiliation
                affiliation_as_current
                bio_external
                people_groups
                group_type
                new_id
                slug
              }
            }
            links: linked_links {
              data {
                title
                url
                type
              }
            }
            sponsors: linked_sponsors {
              data {
                name
                website
                slug
              }
            }
            partners: linked_partners {
              data {
                name
                type
                website
                slug
              }
            }
            events: linked_events {
              data {
                id
                event_title
                talk_title
                type: event_type
                start: start_date
                end: end_date
                location
                description {
                  childMarkdownRemark {
                    excerpt
                  }
                }
              }
            }
            active
          }
        }
      }
    }  
  `)

  for (const node of results.data.allAirtableResearchTable.nodes) {
    const item = node.data
    createPage({
      path: `/research/${item.slug}/`,
      component: require.resolve(`./src/templates/research.js`),
      context: {
        ...item
      }
    })
  }
}

/*
async function makeEventIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtableEvents(
        filter: {
          table: {eq: "Events"}
        }
      ) {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allAirtableEvents.pageInfo.itemCount
  const itemsPerPage = 25
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/events/` : `/events/${i + 1}/`,
      component: path.resolve("./src/templates/event-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeEvents(createPage, graphql) {
  const results = await graphql(`
    query {
      allAirtableEvents(
        filter: {table: {eq: "Events"}}
      ) {
        nodes {
          data {
            id
            slug
            event_title
            talk_title
            type: event_type
            description {
              childMarkdownRemark {
                html
              }
            }
            start: start_date
            end: end_date
            location
            vimeoId: vimeo_id
            storifyUrl: storify_url
            sutoriEmbed: sutori_embed
            twitterMoment: twitter_moment
            speakers {
              data {
                id
                name
                title
                affiliation
                affiliation_as_speaker
                twitter
                website
                headshot {
                  localFiles {
                    childImageSharp {
                      fluid(maxHeight: 200, maxWidth: 200, fit: COVER, srcSetBreakpoints: [200, 400], quality: 100, background: "rgba(255,255,255,0)") {
                        src
                        srcSet
                        aspectRatio
                        sizes
                        base64
                      }
                    }
                  }
                }
                bio
              }
            }
            research_items: linked_research_item {
              data {
                id
                title
              }
            }
          }
        }
      }
    }  
  `)

  for (const node of results.data.allAirtableEvents.nodes) {
    const event = node.data
    if (event.slug) {
      createPage({
        path: `/events/${event.slug}/`,
        component: require.resolve(`./src/templates/event.js`),
        context: {
          ...event
        }
      })
    }
  }
}
*/
