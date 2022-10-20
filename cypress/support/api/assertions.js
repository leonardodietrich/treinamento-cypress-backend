
class Assertions {

    shouldHaveStatus(response, status) {
      expect(response.status, `status id ${status}`).to.eq(status)
    }

  }
  
  export default new Assertions()