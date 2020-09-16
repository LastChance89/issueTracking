const controller = require('../controller/IssueRequestController');
const sinon = require('sinon');
const Result = require('../models/result');
let messageObj = require('../models/messages')
const expect = require('chai').expect;
let Card = require('../models/card');
const assert = require('chai').assert;


describe('Issue Request Controller test', () => {

    beforeEach(() => {
        abfa = [{
            _id: '1111111111',
            type: 'New Functionality',
            priority: 2,
            assignedUser: 'Not Assigned',
            status: 0,
            title: 'test1',
            summary: 'test1',
            __v: 0
        },
        {
            _id: '222222222222',
            type: 'Test',
            priority: 1,
            assignedUser: 'Not Assigned',
            status: 2,
            title: 'test2',
            summary: 'test2',
            __v: 0
        }]


        req = {
            body: {
                card: this.card
            }
        }
        res = {
            json: sinon.spy()
        }
    })

    it('Should create new request', () => {
        //   sinon.stub(controller, 'newIrq').yields(null, new Result(messageObj.messages.CREATE_REQUEST_SUCCESS, false)); 
        sinon.stub(Card, 'create');
        Card.create.yields(null, "");
        controller.newIrq(req, res);
        assert.deepEqual(res.json.firstCall.args[0], new Result(messageObj.messages.CREATE_REQUEST_SUCCESS, false));
    });

    //Might need to adjust this test suite once I add additional project feature. 
    it('Should get all requests', () => {
        sinon.stub(Card, 'find');
        Card.find.yields(null, abfa);
        controller.getAllIrq(req, res);
        assert.deepEqual(res.json.firstCall.args[0][0].iq[0], abfa[0]);
        assert.deepEqual(res.json.firstCall.args[0][2].iq[0], abfa[1]);

    })

})