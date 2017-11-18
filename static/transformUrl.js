(function () {
  var config ={
    serviceAddress : function (publicId) {
      return 'http://scdfis01:8085/engine/'+publicId+'/upload/'
    },
    optionType : {
      'width':'w',
      'height':'h',
      'quality':'q',
      'crop':'c',
      'angle':'a',
      'radius':'r'
    }
  }

  function getUrl(publicId, fullName, options) {
    var url = ""
    var conditional = ""
    if (options == null) {
      options = {};
    }
    if (!publicId) {
      return publicId;
    }
    if (options.transformation) {
      var conditionals = options.transformation.reduce(function (result, option) {
        var keys = Object.keys(option);
        var length = keys.length
        var currentConditional = ''
        while (length--) {
          var proporty = keys[length].toLocaleLowerCase()
          if(config.optionType[proporty]) currentConditional += config.optionType[proporty] + '_' + option[keys[length]] + ','
        }
        currentConditional=currentConditional.slice(0,-1)
        return result + currentConditional + '/'
      }, '');
      console.log(conditionals)
    }
    url = config.serviceAddress(publicId)+conditionals+fullName
    return url
  }
  var api = {
    url:  function (publicId, fullName, options) {
      return getUrl(publicId, fullName, options)
    },
    testfunc : function () {
      return 'this is test function'
    }
  }

  this.DfisTransformers = api;
})();
