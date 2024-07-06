catvm.Addplugin = function (data) {
    if (catvm.memory.PluginArray.temp == undefined) {
        catvm.memory.PluginArray.temp = []
    } else {
        catvm.memory.PluginArray.temp.push(catvm.memory.plugin.new(data))
    }
    catvm.memory.PluginArray.temp = []
}