const axios = require('axios');

class CountryApi{
    constructor(){
        this.firstTime = true;
        this.countries = [];
        this.currentCountry ={};
    }
    getDatas(callback){
        if(this.firstTime){
            axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) =>{
                // handle success
                this.countries = response.data;
                this.firstTime =false;
                this.sizeCheck();
                callback(this.currentCountry);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }else{
            this.sizeCheck();
            callback(this.currentCountry);
        }
    }
    sizeCheck(){
        const countries = this.countries;
        let Country = countries[Math.floor(Math.random() * countries.length)];
        while (Country.name.length >= 12) {
            Country = countries[Math.floor(Math.random() * countries.length)];
        }
        this.currentCountry = Country;
    }
    getCountry(){
        const country = new Promise((resolve, reject) => {
            this.getDatas((country)=>{
                const tips = [
                    country.region, 
                    country.subregion,
                    country.capital,
                    country.flag,
                    country.alpha2Code,
                    country.name
                ]
                resolve({name:country.name, tips : tips})
            })
        });
        return country
    }
}


export default CountryApi;