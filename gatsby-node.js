const _ = require('lodash')

function swap(input, index_A, index_B) {
  let temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
}  
  
function categoriesBuilder(categories) {
  // Mutation array of all the nodes that have not been worked on
  let categoryHistory = [...categories]

  // Used for path lookup on nodes that have been handled
  let categoriesLookUp = {
    /**
     * id: path: String
     */
  }

  // The actual list to use
  let categoryListMap = []

  /**
   * NOTE:
   * ====
   * This confused me at first but when setting a path
   * for the lookup an then placing it according to that
   * path in the list works with just specifying the length
   * 
   * This is because the length represents one index above
   * an index that does not exist. Therefore when setting the
   * node to that index it creates a new entry. When subtracting 1 
   * from the length the node that exists there will get replaced
   */
  let limit = 0
  while (categoryHistory.length > 0 || limit > 1000) {
    limit += 1

    for(let i = 0; i < categoryHistory.length; i++) {
      if(categoryHistory[i].parent) {
        /**
         * loop through the lookup to find the path
         */
        const entries = Object.entries(categoriesLookUp) || []

        let foundParent = false

        // look in the look up if the parent is already added 
        for (let j = 0; j < entries.length; j++) {
          const [key] = entries[j]
          
          if(key === categoryHistory[i].parent.id) {
            /**
             * Found a match
             */
            foundParent = true
            // Get the array path based on the length
            const index = _.get(categoryListMap, `${categoriesLookUp[categoryHistory[i].parent.id]}.children.length`, 0)
            
            const path = `${categoriesLookUp[categoryHistory[i].parent.id]}.children[${index}]`

            // Set the look up path
            categoriesLookUp[categoryHistory[i].id] = path

            // Add it to the list
            _.set(categoryListMap, path, {
              name: categoryHistory[i].name,
              id: categoryHistory[i].id,
              children: []
            })

            // Remove the item from the history
            categoryHistory.splice(i, 1)

            // Break and restart the loop
            break
          }
        }

        if(!foundParent) {
          /**
           * Swap the item with the next one
           * 
           * This is to perserve the sorting of the
           * original query (alphabetically)
           * 
           * This reason i do not have to check for the last
           * index is because all the items has to be sorted
           * into an category (The server implicitly forces this data structure)
           * 
           * so when the item is swapped to the last index it will allways
           * have a place to go
           */
          swap(categoryHistory, i, i + 1)
          break
        }

        break

      } else {
        /**
         * These are the roots
         */

        // Set the look up path
        const path = `[${categoryListMap.length}]`

        categoriesLookUp[categoryHistory[i].id] = path

        // Add it to the list
        categoryListMap.push({
          name: categoryHistory[i].name,
          id: categoryHistory[i].id,
          children: []
        })

        // Remove the item from the history
        categoryHistory.splice(i, 1)

        // Break and restart the loop
        break
      }
    }
  }

  return categoryListMap
}

  function flatCategories(nodes, level) {
    const data = _.flatMapDeep(nodes, (value) => {
      /**
       * Remove the children
       * 
       * The value will always have a children key
       */
      const valueClone = {...value}
      delete valueClone.children

      if(value.children.length > 0) {
        return [
          {
            ...valueClone,
            level: level
          },
          flatCategories(value.children, level + 1)
        ]
      } else {
        return {
          ...valueClone,
          level: level
        }
      }
    })

    return data
  }

exports.sourceNodes = ({actions: {createNode}, createNodeId, createContentDigest, getNodesByType, reporter}, options) => {
  reporter.info('Starting')
  const nodes = getNodesByType('StrapiCategories')

  if(!nodes) return
  reporter.info('Got Nodes')

  const categories = nodes[0].categories

  console.log(JSON.stringify(categories, null, 2))

  reporter.info('Starting tree build')
  const categoriesTree = categoriesBuilder(categories)

  reporter.info('Flatten tree')
  const flattenedCategories = flatCategories(categoriesTree, 0)

  reporter.info('Creating node')
  return createNode({
    categoriesMod: flattenedCategories,
    id: createNodeId(`___CategoriesExtended___`),
    internal: {
      type: `CategoriesExtended`,
      contentDigest: createContentDigest(flattenedCategories)
    }
  })
};
