var skillSpec = require('./API/SkillAPISpec');
var locSpec = require('./API/LocationAPISpec');
var indSpec = require('./API/IndividualAPISpec');
var orgSpec = require('./API/OrganizationAPISpec');
var pvSpec = require('./API/PageViewAPISpec');

describe('API', function(){
  skillSpec();
  locSpec();
  indSpec();
  orgSpec();
  pvSpec();
});

