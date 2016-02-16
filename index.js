var request = require('request')
var parseString = require('xml2js').parseString
var ssdp = require('node-ssdp').Client
var client = new ssdp({
   ssdpTtl: 32
  })

client.on('notify', function () {
  //console.log('Got a notification.')
})

client.on('response', function inResponse(headers, code, rinfo) {
//   console.log('Got a response to an m-search:', headers.LOCATION);
  
  request(headers.LOCATION, function (error, response, body) {
  if (!error && response.statusCode === 200) {
//       console.log(body);
      parseString(body, function (err, result) {
//         console.dir(result, {"depth":null, "color":true});
        var services = '\n';
        result.root.device[0].serviceList[0].service.forEach( function(elem) {
            services = services + elem.serviceType + ' - ' + elem.controlURL + '\n' });
        console.log('Wemo %s found: %s (%s)', result.root.device[0].modelName,  result.root.device[0].friendlyName, headers.LOCATION, services)
        })
    }
})
}); 


client.search('urn:Belkin:service:basicevent:1')



/********** sample output from setup.xml
{ root: 
   { '$': { xmlns: 'urn:Belkin:device-1-0' },
     specVersion: [ { major: [ '1' ], minor: [ '0' ] } ],
     device: 
      [ { deviceType: [ 'urn:Belkin:device:controllee:1' ],
          friendlyName: [ 'Bookcase Lamp' ],
          manufacturer: [ 'Belkin International Inc.' ],
          manufacturerURL: [ 'http://www.belkin.com' ],
          modelDescription: [ 'Belkin Plugin Socket 1.0' ],
          modelName: [ 'Socket' ],
          modelNumber: [ '1.0' ],
          modelURL: [ 'http://www.belkin.com/plugin/' ],
          serialNumber: [ '221310K1100645' ],
          UDN: [ 'uuid:Socket-1_0-221310K1100645' ],
          UPC: [ '123456789' ],
          macAddress: [ 'EC1A5979EA88' ],
          firmwareVersion: [ 'WeMo_WW_2.00.10062.PVT-OWRT-SNS' ],
          iconVersion: [ '1|49153' ],
          binaryState: [ '0' ],
          iconList: 
           [ { icon: 
                [ { mimetype: [ 'jpg' ],
                    width: [ '100' ],
                    height: [ '100' ],
                    depth: [ '100' ],
                    url: [ 'icon.jpg' ] } ] } ],
          serviceList: 
           [ { service: 
                [ { serviceType: [ 'urn:Belkin:service:WiFiSetup:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:WiFiSetup1' ],
                    controlURL: [ '/upnp/control/WiFiSetup1' ],
                    eventSubURL: [ '/upnp/event/WiFiSetup1' ],
                    SCPDURL: [ '/setupservice.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:timesync:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:timesync1' ],
                    controlURL: [ '/upnp/control/timesync1' ],
                    eventSubURL: [ '/upnp/event/timesync1' ],
                    SCPDURL: [ '/timesyncservice.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:basicevent:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:basicevent1' ],
                    controlURL: [ '/upnp/control/basicevent1' ],
                    eventSubURL: [ '/upnp/event/basicevent1' ],
                    SCPDURL: [ '/eventservice.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:firmwareupdate:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:firmwareupdate1' ],
                    controlURL: [ '/upnp/control/firmwareupdate1' ],
                    eventSubURL: [ '/upnp/event/firmwareupdate1' ],
                    SCPDURL: [ '/firmwareupdate.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:rules:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:rules1' ],
                    controlURL: [ '/upnp/control/rules1' ],
                    eventSubURL: [ '/upnp/event/rules1' ],
                    SCPDURL: [ '/rulesservice.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:metainfo:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:metainfo1' ],
                    controlURL: [ '/upnp/control/metainfo1' ],
                    eventSubURL: [ '/upnp/event/metainfo1' ],
                    SCPDURL: [ '/metainfoservice.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:remoteaccess:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:remoteaccess1' ],
                    controlURL: [ '/upnp/control/remoteaccess1' ],
                    eventSubURL: [ '/upnp/event/remoteaccess1' ],
                    SCPDURL: [ '/remoteaccess.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:deviceinfo:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:deviceinfo1' ],
                    controlURL: [ '/upnp/control/deviceinfo1' ],
                    eventSubURL: [ '/upnp/event/deviceinfo1' ],
                    SCPDURL: [ '/deviceinfoservice.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:smartsetup:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:smartsetup1' ],
                    controlURL: [ '/upnp/control/smartsetup1' ],
                    eventSubURL: [ '/upnp/event/smartsetup1' ],
                    SCPDURL: [ '/smartsetup.xml' ] },
                  { serviceType: [ 'urn:Belkin:service:manufacture:1' ],
                    serviceId: [ 'urn:Belkin:serviceId:manufacture1' ],
                    controlURL: [ '/upnp/control/manufacture1' ],
                    eventSubURL: [ '/upnp/event/manufacture1' ],
                    SCPDURL: [ '/manufacture.xml' ] } ] } ],
          presentationURL: [ '/pluginpres.html' ] } ] } }
          
        *********/
