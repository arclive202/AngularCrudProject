var fs = require('fs')

delfunc = function(fname)
{
    fs.unlink(fname)
}