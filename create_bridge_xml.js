// to connect two networks together, check virtualwire and dvportgroup
// we need objectid from logical switch and dvportgroup id.
// input the two objects created by logcal switch en dvportgroup
System.log(logicalswitch.objectId)
System.log(dvPortgroup.id)

// create new javascript object with new bridge info
var newBridge = []
newBridge["name"] = "bridge" + vlan
newBridge["virtualWire"] = logicalswitch.objectId
newBridge["dvportGroup"] = dvPortgroup.id

// first javascript to play around with XML document
// XML is only using nodes, no attributes used.
//
//we should be receiving following structure
// ---
//<bridges>
//<version>31</version>
//<enabled>true</enabled>
//<bridge>
//<bridgeId>2</bridgeId>
//<name>test</name>
//<virtualWire>virtualwire-60</virtualWire>
//<virtualWireName>EVPN1206</virtualWireName>
//<dvportGroup>dvportgroup-31637</dvportGroup>
//<dvportGroupName>dvs01-DEMO-BGP</dvportGroupName>
//</bridge>
//</bridges>
// ---
// we only need virtualwire and dvportgroup to rebuild XML structure

// convert string to XMLDocument object
var XMLDoc = XMLManager.fromString(content)

// get root document node <bridges>
var bridges = XMLDoc.getDocumentElement()

// get all items from <bridges>, the root attribute
var items = bridges.getChildNodes()

// but first create new XML document object with <bridges> as root element
var newXMLDoc = XMLManager.newDocument()
var root = newXMLDoc.createElement("bridges")
newXMLDoc.appendChild(root)

// we can skip first two elements, the version and enabled
// we only need three elements: name,dvportGroup and virutalWire
var elements = ["name", "dvportGroup", "virtualWire"]

for (i = 2 ; i < items.length; i++) {
   //first create new bridge node <bridge> and append to root node <bridges>
   var bridge = newXMLDoc.createElement("bridge")
   
   // now get old bridge elements and create attributes for element bridge
   for (j = 0; j < elements.length; j++) {      
      var value = get_xml_values(items.item(i),elements[j])
      var element = newXMLDoc.createElement(elements[j])
      element.textContent = value

      //now append new child to bridge
	  //we couldn't use attribute, not supported by NSX as imput.
      bridge.appendChild(element)
   }
   
   //now add bridge node with all it's child nodes to bridges
   root.appendChild(bridge)

}

//now repeat this one more time for the new bridge values
bridge = newXMLDoc.createElement("bridge")    
for (j = 0; j < elements.length; j++) {   
   element = newXMLDoc.createElement(elements[j])
   element.textContent = newBridge[elements[j]]
   bridge.appendChild(element)
}

//now add new bridge node with all it's child nodes to bridges
root.appendChild(bridge)

//now convert xmldocument object to string
var content = XMLManager.getDocumentContent(newXMLDoc)
System.log(String(content));

function get_xml_values(object,key) {
   var nodelist = object.getElementsByTagName(key)
   System.log(nodelist.item(0).textContent)
   return nodelist.item(0).textContent
}