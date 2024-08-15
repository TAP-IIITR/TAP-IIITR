import shaurya from './assets/alumni/Shaurya shrivastav.jpeg'
import vishal from './assets/alumni/Vishal pratap singh.jpeg'
import noopur from './assets/noopur-mam.png'
type Alumni = {
    image: string;
    name: string;
    lpa: string;
    company: string;
}

export const alumniData: Alumni[] = [
    { image: shaurya, name: "John Doe", lpa: "10 LPA", company: "Google" },
    { image: shaurya, name: "Jane Smith", lpa: "12 LPA", company: "Facebook" },
    { image: shaurya, name: "Michael Johnson", lpa: "15 LPA", company: "Amazon" },
    { image: shaurya, name: "Emily Davis", lpa: "9 LPA", company: "Netflix" },
    { image: vishal, name: "Chris Brown", lpa: "11 LPA", company: "Apple" },
    { image: vishal, name: "Sophia Wilson", lpa: "13 LPA", company: "Microsoft" },
    { image: vishal, name: "Liam Miller", lpa: "14 LPA", company: "Tesla" },
    { image: vishal, name: "Olivia Taylor", lpa: "16 LPA", company: "Airbnb" },
];


type Team = {
    image: string;
    name: string;
    designation?: string;
    department?: string;
}

export const teamsData: Team[] = [
    {
        image: noopur,
        name: "Dr.Noopur Pandey",
        designation: "Faculty Coordinator",
        department: "Training & Placement Cell, IIIT Ranchi"
    },
    {
        image: noopur,
        name: "Manu Shukla",
    },
    {
        image: noopur,
        name: "Mrinmoy Mahato"
    },
    {
        image: noopur,
        name: "Shivam Bharadwaj"
    },
    {
        image: noopur,
        name: "Shivang Sharma"
    },
]