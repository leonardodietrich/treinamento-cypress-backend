
class Requests {

    createBooking(){
      return cy.api({
        method: 'POST',
        url: `booking`,
        body: {
          "firstname" : "Jim",
          "lastname" : "Brown",
          "totalprice" : 111,
          "depositpaid" : true,
          "bookingdates" : {
              "checkin" : "2020-01-01",
              "checkout" : "2020-01-02"
          },
          "additionalneeds" : "Breakfast"
      },
        failOnStatusCode: false
      })
    }

    getBooking(response){
      const id = response.body.bookingid
      return cy.api({
        method: 'GET',
        url: `booking/${id}`,
        failOnStatusCode: false
      })
    }

    deleteBooking(response){
      const id = response.body.bookingid
      return cy.api({
        method: 'DELETE',
        url: `/booking/${id}`,
        headers:{
          Cookie: `token=${Cypress.env('token')}`
        },
        failOnStatusCode: false
      })
    }

    deleteBookingWithoutToken(response) {
      const id = response.body.bookingid
      return cy.api({
        method: 'DELETE',
        url: `/booking/${id}`,
        failOnStatusCode: false
      })
    }

    deleteBookingWithInvalidToken(response) {
      const id = response.body.bookingid
      return cy.api({
        method: 'DELETE',
        url: `/booking/${id}`,
        headers:{
          Cookie: 'token=token_invalido'
        },
        failOnStatusCode: false
      })
    }

    postAuth() {
      return cy.api({
        method: 'POST',
        url: 'auth',
        body: {
          "username": "admin",
          "password": "password123"
        }
      })
    }
  
    doAuth() {
      this.postAuth().then(authResponse => {
        const token = authResponse.body.token
  
        Cypress.env('token', token)
      })
    }
  
  }
  
  export default new Requests()