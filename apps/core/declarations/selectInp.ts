
    export type countryInp = {
      
      user: number | userInp
    }

    export type userInp = {
      country: number | countryInp
      
    }
