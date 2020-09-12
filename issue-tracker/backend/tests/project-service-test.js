const projectService = require('../services/project-service');
const expect = require('chai').expect;
const cache = require('../util/cacheUtility');
const assert = require('chai').assert;

describe('Project Service Test suite.', function () {

  describe('setupAllIrqData method tests', function () {

    it('Should setup the project columns with retrived requests', () => {
      let projectMeta = {
        Test:
          [{ "name": "new", "position": 0, "iq": [] }, { "name": "In Progress", "position": 1, "iq": [] }, {
            "name": "Testing", "position": 2,
            "iq": []
          }, { "name": "Approval", "position": 3, "iq": [] }, { "name": "Completed", "position": 4, "iq": [] }]
      }
      cache.setCacheObject("projectMeta", projectMeta);

      let data = [{
        _id: 'N1595977060471',
        type: 'New Functionality',
        priority: 2,
        assignedUser: 'Not Assigned',
        status: 0,
        title: 'asdf',
        summary: 'asdf',
        __v: 0
      },
      {
        _id: 'N1595977060471',
        type: 'New Functionality',
        priority: 2,
        assignedUser: 'Not Assigned',
        status: 4,
        title: 'asdf',
        summary: 'asdf',
        __v: 0
      }]

      let setup = projectService.setupAllIrqData(data);
      //console.log(setup);
      assert.equal(setup[0].iq[0], data[0]);
      assert.equal(setup[4].iq[0], data[1]);
    })
  });


  describe('generateIqrID method tests', function () {
    it('Should setup New Functionality ID with appropriate prefix', () => {
      let newReq = { type: 'New Functionality' }
      let setupNewReq = projectService.generateIqrID(newReq);
      expect(setupNewReq._id).to.be.an('String').that.include('N');
    });

    it('Should setup Enhancement ID with appropriate prefix', () => {
      let newReq = { type: 'Enhancement' }
      let setupNewReq = projectService.generateIqrID(newReq);
      expect(setupNewReq._id).to.be.an('String').that.include('E');

    });
    it('Should setup Defect ID with appropriate prefix', () => {
      let newReq = { type: 'Defect' }
      let setupNewReq = projectService.generateIqrID(newReq);
      expect(setupNewReq._id).to.be.an('String').that.include('D');
    });
    it('Should setup Generic Request ID with appropriate prefix', () => {
      let newReq = { type: 'Generic Request' }
      let setupNewReq = projectService.generateIqrID(newReq);
      expect(setupNewReq._id).to.be.an('String').that.include('G');
    });
  });
})