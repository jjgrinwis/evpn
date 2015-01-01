// creating virtualwire name based on vlan
// but first create l2 bridge between vxlan and vlan
System.log("creating l2bridge for vlan" + vlan)

// create virtualwire name
logicalSwitchName = "EVPN" + vlan

//vlanID is a number so we can feed that one into Update Distributed Switch workflow
vlanID = Number(vlan)

System.log(logicalSwitchName)