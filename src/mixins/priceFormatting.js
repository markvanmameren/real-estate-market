export default {
    methods: {
        priceFormatting(amount, currency) {
            //init string value
            let returnString = "?" //init
            let stringPrice = "" // empty init
            // convert price property to string
            if (amount) {
                stringPrice = amount.toString()
            }
            let currencyString = "" // empty init
            if (currency) {
                currencyString = currency.toString() + " "
            }
            // if string is not empty
            if (stringPrice !== "") {
                // transform string to array
                let stringPriceArray = stringPrice.split("")
                // reverse array
                let reversedStringPriceArray = stringPriceArray.reverse()
                // init empty return array
                let returnArray = []
                // for every number in the reversed array
                for (let i = 0; i < reversedStringPriceArray.length; i++) {
                    // create variables for current number and next number (which is actually the previous one in the reversed array)
                    let number = reversedStringPriceArray[i]
                    let nextNumber = reversedStringPriceArray[i - 1]
                    // before every 4rd number in the reverse array, add a dot. Except when its the last number in the array
                    if (i % 3 === 0 && nextNumber) {
                        returnArray.push('.')
                    }
                    returnArray.push(number)
                }
                // undo the reverse and join all numbers in one string
                returnString = currencyString + returnArray.reverse().join("")
            }
            return returnString
        }
    }
}