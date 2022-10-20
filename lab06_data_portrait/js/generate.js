// this is what I used to generate the random new data we're using rn!

const baby = []

// random names for me to choose from
const names = ["Tiffany", "Phoenix", "Declan", "Ayana", "Parker", "Grayson", "Sunny", "Jacquelin", "Tavon", "Devonta", "Stacie", "Julie", "Dorothy", "Arjun", "Isai", "Maximiliano", "Marques", "Jayleen", "Varun", "Jelani", "Jaylin", "Alonso", "Jaeden", "Gunner", "Zechariah", "Chelsea", "Warren", "Jonah", "Devan", "Blaz"]

// random attributes
const attrs = ["clean", "behaved", "playful", "noisy", "poopy", "cute"]

// a for loop that runs 20 times
for (let i = 0; i < 20; i++) {

    // I will get number 1 to 6
    let num = parseInt(1 + Math.random() * 6)
    // I found this function online which will select the amount of elements I want from an array for me
    attr = getMultipleRandom(attrs, num)

    // push these things into the baby Array
    baby.push({
        "Name": names[i],
        "Attr": attr
    })
}

// and viola! now I have my JSON file
console.log(baby)

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
}