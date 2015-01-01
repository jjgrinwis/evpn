// first script making use of XML
// we can't specify ACCEPT in an eays way with the default REST API for VCO
// So let's make use of the XML classes from VCO.

// so it's XML but we receive it as a string
// let's convert output to a XML object
XML = XMLManager.fromString(output)
if (!XML) {
   System.log("Invalid XML document")
   throw "Invalid XML document"
}

System.log("XML: " + XML)

// now lookup all the devices in element tag device
devicelist = XML.getElementsByTagName("device")
if(devicelist.length < 1) {
   System.log("No devices found")
   throw "no devices found"
}

// now loop through all devices and push key on list
// first create emtpy keys array and then fill with key values
keys = []
for (var i = 0; i < devicelist.length; i++ ) {
   device = devicelist.item(i)
   keys[i] = device.getAttribute("key")
}

// this should be it, keys can be used in next script
System.log("Found device keys's:" + keys)