'use strict';

/**
 * creates popups giving directions to Pi. Co. Pizza Bar in the plaza
 */
function driveToRestaurant() {
    alert('Turn right onto William F. Bell Parkway');
    alert('Then turn right onto Leslie Street');
    alert('Continue for 400m, then turn left');
    alert('Turn right, then your destination will be on the right');
}

/**
 * creates popups giving directions to the CN Tower
 */
function driveToCNTower() {
    alert("Head south on William F. Bell Pkwy toward Elgin Mills Rd E.");
    alert("Turn right onto Elgin Mills Rd E.");
    alert("Turn left onto Leslie St.");
    alert("Continue onto Yonge St heading south toward Toronto.");
    alert("Follow Yonge St for ~30 km into downtown Toronto.");
    alert("Turn right onto Front St W.");
    alert("Continue on Front St W toward downtown core.");
    alert("Turn left onto John St or follow signs for Bremner Blvd.");
    alert("Arrive at CN Tower, 290 Bremner Blvd, Toronto, ON M5V 3L9, Canada");
    alert("End of directions.");
}

/**
 * init function that runs upon site loading -- calls driveToRestaurant() and driveTo
 */
function start() {
    driveToRestaurant();
    driveToCNTower();
}
