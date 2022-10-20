/// <reference types="cypress" />

import assertions from '../support/api/assertions'
import req from '../support/api/requests'

describe('Validar exclusão de reserva', () => {

    
    it('Excluir reserva sem token', () => {
        req.createBooking().then(createBookingResponse => {
            req.deleteBookingWithoutToken(createBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });

    it('Escluir reserva com token válido', ()=>{
        req.createBooking().then(createBookingResponse => {
            req.deleteBooking(createBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
                req.getBooking(createBookingResponse).then(getBookingReponse => {
                    assertions.shouldHaveStatus(getBookingReponse, 404)
                })
            })
        })
    })

    it('Escluir reserva com token inválido', ()=>{
        req.createBooking().then(createBookingResponse => {
            req.deleteBookingWithInvalidToken(createBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                req.getBooking(createBookingResponse).then(getBookingReponse => {
                    assertions.shouldHaveStatus(getBookingReponse, 200)
                })
            })
        })
    })
})