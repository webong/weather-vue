<template>
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading margin">Weather App</h1>
          <div class="input-group mt-1 mb-1">
            <input type="text" id="locationQuery" class="form-control" placeholder="Enter a Location to get Weather Results">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" id="button-addon2" @click.prevent="findLocation" >Search</button>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
  import arrive from 'arrive'

export default {
   name: 'Search',
           data() {
            return {
                inputQueryFocus: false
            }
        },
        methods: {
            clearInput() {
                let inputQueryDOM = document.querySelector('#inputQuery')
                inputQueryDOM.value = ''
                inputQueryDOM.focus()
                this.$store.dispatch('inputQuery', null)
            },
            movePacContainer(addressData) {
                document.arrive('.pac-container', function() {
                    document.querySelector('.search-box').appendChild(this)
                })
            },
            browerGeolocation() {
                return new Promise((resolve, reject) => {
                    if (!navigator.geolocation) {
                        this.$store.dispatch('appStatus', {
                            state: 'error',
                            message: 'Unfortunately, your device does not support geolocation. No problem though. Search away.'
                        })
                        return
                    }
                    let success = position => {
                        this.$store.dispatch('locationIcon', 'lock')
                        this.$store.dispatch('coordinates', {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                        resolve()
                    }
                    let error = () => {
                        this.$store.dispatch('locationIcon', 'disabled')
                        this.$store.dispatch('appStatus', {
                            state: 'error',
                            message: 'No geolocation? No problem. Search away.'
                        })
                    }
                    navigator.geolocation.getCurrentPosition(success, error)
                })
            },
            findLocation() {
                document.querySelector('#inputQuery').value = ''
                this.$store.dispatch('inputQuery', null)
                this.$store.dispatch('appStatus', {
                    state: 'loading'
                })
                this.getBrowserLocation()
            },
            getBrowserLocation() {
                this.browerGeolocation().then(() => {
                    this.$store.dispatch('geocode', 'default').then((response) => {
                        this.$store.dispatch('weather', {
                                woeid: response.woeid,
                                type: 'query',
                                idxCity: -1
                            })
                            .then(() => this.$store.dispatch('appStatus', {
                                state: 'loaded'
                            }))
                    })
                })
            },
            getInputQuery(addressData, placeResultData) {
                let query = (placeResultData) ?
                    query = placeResultData.formatted_address :
                    query = document.querySelector('#inputQuery').value
                this.$store.dispatch('inputQuery', query)
                this.$store.dispatch('locationIcon', 'search')
                this.$store.dispatch('appStatus', {
                    state: 'loading'
                })
                this.$store.dispatch('geocode', 'reverse')
                    .then((response) => this.$store.dispatch('weather', {
                            woeid: response.woeid,
                            type: 'query',
                            idxCity: -1
                        })
                        .then(() => this.$store.dispatch('appStatus', {
                            state: 'loaded'
                        })))
            }
        },
        mounted() {
            this.movePacContainer()
            this.getBrowserLocation()
        },
        watch: {
            formattedAddress() {
                document.title = `${this.store.geocode.formattedAddress} | Weather Vue`
            }
        }
}
</script>

<style>
   .margin{
     margin-top: -100px;
     padding-top: -50px;
   }

</style>
