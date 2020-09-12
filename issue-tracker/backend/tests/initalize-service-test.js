const Project = require('../models/project');
const { expect } = require('chai');
const cache = require('../util/cacheUtility')
const initService = require('../services/initalize-service');
const sinon = require('sinon');
const assert = require('chai').assert;

describe('Initalize service test', ()=>{

    it('Should initalize the cache with the projectMeta data', ()=>{

        let projectMeta = [{ columns:
            [ { name: 'new', position: 0, iq: [] },        
              { name: 'In Progress', position: 1, iq: [] },
              { name: 'Testing', position: 2, iq: [] },    
              { name: 'Approval', position: 3, iq: [] },   
              { name: 'Completed', position: 4, iq: [] } ],
           projectTitle: 'Test' }]

        sinon.stub(Project, 'find');
        Project.find.yields(null,projectMeta);
        
        initService.initalize();
        assert.equal(cache.getCachedObject("projectMeta")["Test"].columns, projectMeta.columns);

    })
})