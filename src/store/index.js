import { createStore } from 'vuex'
import router from '../router'
import objectContainsString from '../mixins/objectContainsString'

export default createStore({
  strict: process.env.NODE_ENV !== 'production', // enable strict mode only in development
  state: {
    currentSortDir: 'asc',
    searchTerm: '',
    headerButtonData: {
      text: "Create new",
      destination: "add",
      visible: true
    },
    previousPage: {
      path: "/",
      name: "Houses"
    },
    backgroundImageVisible: false,
    pageTitleVisible: true,
    backButtonVisible: false,
    houses: [], // empty array to be filled by API
    sortOptions: [
      {
        type: 'price',
        isSelected: true,
        isDefault: true
      },
      {
        type: 'size',
        isSelected: false,
        isDefault: false
      },
    ],
    historyIds: [] // empty init
  },
  getters: {
    getPreviousPage(state) {
      return state.previousPage
    },
    getPageTitleVisible(state) {
      return state.pageTitleVisible
    },
    getHeaderButtonData(state) {
      return state.headerButtonData
    },
    getSortOptions(state) {
      return state.sortOptions
    },
    getSortDirection(state) {
      return state.currentSortDir
    },
    getBackButtonVisible(state) {
      return state.backButtonVisible
    },
    getBackgroundImageVisible(state) {
      return state.backgroundImageVisible
    },
    getSearchTerm(state) {
      return state.searchTerm
    },
    getHouses(state, getters) {
      let filteredHouses = [] // empty array init
      if (typeof state.houses !== 'undefined') {
        // filter houses by using a mixing to search for the searchterm in all house properties
        filteredHouses = state.houses.filter((house) => objectContainsString.methods.objectContainsString(getters.getSearchTerm, house))
      }
      return filteredHouses
    },
    getHousesCount(state, getters) {
      let houseCount = 0 // number init
      if (typeof getters.getHouses !== 'undefined') {
        houseCount = getters.getHouses.length
      }
      return houseCount
    },
    getMadeHouses(state, getters) {
      let filteredHouses = [] // empty array init
      if (typeof getters.getHouses !== 'undefined') {
        // filter houses by checking the property madeByMe
        filteredHouses = getters.getHouses.filter((house) => house.madeByMe)
      }
      return filteredHouses
    },
    getMadeHousesCount(state, getters) {
      let houseCount = 0 // number init
      if (typeof getters.getMadeHouses !== 'undefined') {
        houseCount = getters.getMadeHouses.length
      }
      return houseCount
    },
    getLikedHouses(state, getters) {
      let filteredHouses = [] // empty array init
      if (typeof getters.getHouses !== 'undefined') {
        // filter houses by checking the property liked (which only exists locally)
        filteredHouses = getters.getHouses.filter((house) => house.liked)
      }
      return filteredHouses
    },
    getLikedHousesCount(state, getters) {
      let houseCount = 0 // number init
      if (typeof getters.getLikedHouses !== 'undefined') {
        houseCount = getters.getLikedHouses.length
      }
      return houseCount
    },
    getRecommendedHousesForHouseId: (state, getters) => (houseId, amount) => {
      // this function returns an amount of houses which are closest to the price of houseId

      // finding price to search
      let housePrice = 0 // number init
      if (houseId) {
        let house = {} // object init
        house = getters.getHouseById(houseId)
        if (house.price) {
          // get price property from house
          housePrice = house.price
        }
      }

      // determining number of house to return
      let numberOfHouses = 5 // init
      if (typeof amount !== 'undefined' && amount > 0) {
        numberOfHouses = amount
      }

      let housesToSort = [] // init array to sort
      if (typeof getters.getHouses !== 'undefined') {
        housesToSort = [...getters.getHouses] // copy array
      }

      // remove this house from array to sort
      housesToSort = housesToSort.filter((house) => String(house.id) !== houseId)

      // remove my listings from array to sort
      housesToSort = housesToSort.filter((house) => house.madeByMe === false)

      // sort by price
      let allResults = housesToSort.sort((a, b) => {
        return Math.abs(housePrice - a.price) - Math.abs(housePrice - b.price)
      })
      // only return the requested number of houses
      return allResults.slice(0, numberOfHouses)
    },
    getHouseById: (state, getters) => (houseId) => {
      let selectedHouse = {} // empty object init
      // get the house from state.houses by comparing the id and returning the first object of the return array
      let selectedHouseFromFilter = getters.getHouses.filter((house) => String(house.id) == houseId)[0]
      if (typeof selectedHouseFromFilter !== 'undefined') {
        selectedHouse = selectedHouseFromFilter
      }
      return selectedHouse
    },
    getHistoryIds(state) {
      return state.historyIds
    },
    getHistoryHouses(state, getters) {
      let filteredHouses = [] // empty array init
      // if state.houses and history exists
      if (typeof getters.getHouses !== 'undefined' && typeof getters.getHistoryIds !== 'undefined') {
        // local variables for easier readability
        let houses = getters.getHouses
        let ids = getters.getHistoryIds
        // match the house ids from state.houses with the history ids and return the filtered houses
        filteredHouses = houses.filter((house) => ids.find((id) => id === String(house.id)) !== undefined)
      }
      return filteredHouses
    },
    getHistoryCount(state, getters) {
      let houseCount = 0 // number init
      if (typeof getters.getHistoryHouses !== 'undefined') {
        houseCount = getters.getHistoryHouses.length
      }
      return houseCount
    }
  },
  mutations: {
    setPreviousPage(state, pageObject) {
      state.previousPage = pageObject
    },
    hideHeaderButton(state) {
      state.headerButtonData.visible = false
    },
    showPageTitle(state) {
      state.pageTitleVisible = true
    },
    hidePageTitle(state) {
      state.pageTitleVisible = false
    },
    showHeaderButton(state) {
      state.headerButtonData.visible = true
    },
    hideBackButton(state) {
      state.backButtonVisible = false
    },
    showBackButton(state) {
      state.backButtonVisible = true
    },
    hideBackgroundImage(state) {
      state.backgroundImageVisible = false
    },
    showBackgroundImage(state) {
      state.backgroundImageVisible = true
    },
    setSearchTerm(state, newSearchTerm) {
      state.searchTerm = newSearchTerm
    },
    setHouses(state, data) {
      // Adding liked property to each house in data (only locally)
      data.forEach(house => house.liked = false) // init as false
      // storing data in array
      state.houses = data
      // sort array
      this.commit('sortHouses')
    },
    likeHouseWithId(state, houseId) {
      let returnArray = state.houses
      let selectedHouse = returnArray.filter((house) => String(house.id) === houseId && typeof house.liked !== "undefined")[0]
      selectedHouse.liked = !selectedHouse.liked // toggle liked
      state.houses = returnArray
    },
    deleteHouseLocally(state, houseId) {
      let filteredHouses = state.houses
      state.houses = filteredHouses.filter((house) => String(house.id) !== houseId)
    },
    sortHouses(state, sortKey) {
      // Loop through all sortOptions
      state.sortOptions.forEach(sortOption => {

        // Default sortKey for when no sortKey was specified
        if (!sortKey && sortOption.isDefault) {
          sortKey = sortOption.type
        }

        // if sortOption is equal to received sortKey
        if (sortOption.type === sortKey) {
          // If this option was already selected, invert direction
          if (sortOption.isSelected) {
            state.currentSortDir = state.currentSortDir === 'asc' ? 'desc' : 'asc'
          }
          // set this sortOption as selected
          sortOption.isSelected = true

          // copy houses-array from state
          let sortedHouses = state.houses

          // sort array by using currentSortDir and sortKey
          sortedHouses.sort((a, b) => {
            let modifier = 1
            if (state.currentSortDir === 'desc') modifier = -1
            if (a[sortKey] < b[sortKey]) return -1 * modifier
            if (a[sortKey] > b[sortKey]) return modifier
          })
          // replace houses-array from state with sorted houses-array
          state.houses = sortedHouses

        } else {
          // set other sortOptions as deselected
          sortOption.isSelected = false
        }
      })
    },
    addToHistoryIds(state, houseId) {
      let maximum = 10 // maxium number of history items
      if (houseId) {
        // if house was already viewed, remove previous entry from history
        state.historyIds = state.historyIds.filter((id) => id !== houseId)

        // if the history length exceeds the maximum
        if (state.historyIds.length >= maximum) {
          state.historyIds.shift() // remove first element
        }
        // add this houseId to the history
        state.historyIds.push(houseId)
      }
    }
  },
  actions: {
    fetchHousesFromAPI({ commit }) {
      // create fetch headers and add my Api key
      let myHeaders = new Headers()
      myHeaders.append("X-Api-Key", process.env.VUE_APP_API_KEY)

      // create request options and add my headers
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      // start fetch request with above request options
      fetch(process.env.VUE_APP_API_URL, requestOptions)
        .then(response => {
          if (!response.ok) {
            // throw error if response.ok is false
            throw Error(response.statusText)
          }
          // return response as JSON
          return response.json()
        })
        .then(result => {
          // store houses with the JSON result
          commit('setHouses', result)
        })
        .catch(error => console.log('error', error))
    },
    addNewHouseToApi({ dispatch }, { newHouse, newImageFile }) {
      // Adding newHouse to API without image, adding image after receiving id back from api
      if (newHouse) { // if new house is provided
        // create fetch headers and add my Api key
        let myHeaders = new Headers()
        myHeaders.append("X-Api-Key", process.env.VUE_APP_API_KEY)

        // convert house properties to formdata
        let houseAsFormdata = new FormData()
        // Loop through all keys
        Object.entries(newHouse).forEach(([key, value]) => {
          houseAsFormdata.append(key, value)
        })

        // create request options and add my headers
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: houseAsFormdata,
          redirect: 'follow'
        }

        // start fetch request with above request options
        fetch(process.env.VUE_APP_API_URL, requestOptions)
          .then(response => {
            if (!response.ok) {
              // throw error if response.ok is false
              throw Error(response.statusText)
            }
            // return response as JSON
            return response.json()
          })
          .then(result => {
            if (result.id) {
              if (newImageFile) {
                // also upload image file for the received ID when an imageFile is supplied
                let objectToDispatch = {
                  houseId: result.id,
                  imageFile: newImageFile
                }
                dispatch('addImageToApiForHouseId', objectToDispatch)
              } else {
                // no image was uploaded, fetch houses and go to Details page for the newly added house
                dispatch('fetchHousesFromAPI')
                router.push({ name: 'House Details', params: { id: result.id } })
              }
            }
          })
          .catch(error => console.log('error', error))
      }
    },
    editHouseOnApi({ dispatch }, { houseId, updatedHouse, newImageFile }) {
      if (updatedHouse) {
        // Adding updatedHouse to API without image

        // create fetch headers and add my Api key
        let myHeaders = new Headers()
        myHeaders.append("X-Api-Key", process.env.VUE_APP_API_KEY)

        // convert house properties to formdata
        let houseAsFormdata = new FormData()
        // Loop through all keys
        Object.entries(updatedHouse).forEach(([key, value]) => {
          houseAsFormdata.append(key, value)
        })

        // create request options and add my headers
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: houseAsFormdata,
          redirect: 'follow'
        }

        // create url for this houseId
        const editHouseApiURL = process.env.VUE_APP_API_URL + '/' + houseId

        // start fetch request with above request options
        fetch(editHouseApiURL, requestOptions)
          .then(response => {
            if (!response.ok) {
              // throw error if response.ok is false
              throw Error(response.statusText)
            }
            // return response as text
            return response.text()
          })
          .then(() => {
            if (houseId) {
              if (newImageFile) {
                // also upload image file for the received ID when an imageFile is supplied
                let objectToDispatch = {
                  houseId: houseId,
                  imageFile: newImageFile
                }
                dispatch('addImageToApiForHouseId', objectToDispatch)
              } else {
                // no image was uploaded, fetch houses and go to Details page for the newly added house
                dispatch('fetchHousesFromAPI')
                router.push({ name: 'House Details', params: { id: houseId } })
              }
            }
          })
          .catch(error => console.log('error', error))
      }
    },
    deleteHouseFromApiWithId({ commit }, houseId) {
      // create fetch headers and add my Api key
      let myHeaders = new Headers()
      myHeaders.append("X-Api-Key", process.env.VUE_APP_API_KEY)

      // create request options and add my headers
      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      }

      // create URL for this house id
      const deleteHouseApiURL = process.env.VUE_APP_API_URL + '/' + houseId

      // start fetch request with above request options
      fetch(deleteHouseApiURL, requestOptions)
        .then(response => response.text()) // return response as text
        .then(commit('deleteHouseLocally', houseId))
        .catch(error => console.log('error', error))
    },
    addImageToApiForHouseId({ dispatch }, { houseId, imageFile }) {
      // Upload image wih result ID
      if (houseId && imageFile) {
        // create fetch headers and add my Api key
        let myHeaders = new Headers()
        myHeaders.append("X-Api-Key", process.env.VUE_APP_API_KEY)

        // create upload url for this houseId
        const imgUploadApiURL = process.env.VUE_APP_API_URL + '/' + houseId + '/upload'

        // convert image to formdata
        let imgAsFormdata = new FormData()
        imgAsFormdata.append("image", imageFile, imageFile.name)

        // create request options and add my headers
        let imgRequestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: imgAsFormdata,
          redirect: 'follow'
        }

        // start fetch request with above request options
        fetch(imgUploadApiURL, imgRequestOptions)
          .then(response => {
            if (!response.ok) {
              // throw error if response.ok is false
              throw Error(response.statusText)
            }
            // renew local copy of all houses
            dispatch('fetchHousesFromAPI')
            // return response as text
            return response.text()
          })
          .then(result => {
            // go to 'House Details' page for this house
            router.push({ name: 'House Details', params: { id: houseId } })
          })
          .catch(error => console.log('error', error))
      }
    }
  },
})
