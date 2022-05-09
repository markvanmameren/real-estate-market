export default {
    methods: {
        objectContainsString(searchString, objectToSearch) {
            // Convert searchString to all lowercase
            searchString = searchString.toLowerCase()

            // Get all keys from object
            let allKeys = Object.keys(objectToSearch)
            // Loop through all those keys
            for (const key of allKeys) {
                // If property is also an object
                if (typeof objectToSearch[key] === 'object') {
                    // Search subObject for its keys
                    let subObject = objectToSearch[key]
                    let allSubKeys = Object.keys(subObject)
                    // Loop through all the subkeys
                    for (const subKey of allSubKeys) {
                        // If subKey is not ALSO an object
                        if (typeof subObject[subKey] !== 'object') {
                            // Get value for key and convert value to all lowercase
                            let subValueToSearch = String(subObject[subKey]).toLowerCase()
                            if (subValueToSearch.includes(searchString)) {
                                // If value contains searchString, return true
                                return true
                            }
                        }
                    }
                    // If property is not an object
                } else {

                    // Get value for key and convert value to all lowercase
                    let valueToSearch = String(objectToSearch[key]).toLowerCase()
                    if (valueToSearch.includes(searchString)) {
                        // If value contains searchString, return true
                        return true
                    }
                }
            }
        }
    }
}