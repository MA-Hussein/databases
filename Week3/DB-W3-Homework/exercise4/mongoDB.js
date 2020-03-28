

const { MongoClient } = require("mongodb");

async function main() {
    const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

    try {
        await client.connect();
        //Create a new record (document) for a new city (your home town, say)
        await createCity(client, {
            name: "New Aleppo",
            countryCode: "SYR",
            population: 2000000
        });

        await findOneCityByName(client, "New Aleppo");

        //-----------------------------------------------------------------------------
        //Update that record with a new population
        await updateCityByName(client, "New Aleppo", {
            population: 2500000
        });

        await findOneCityByName(client, "New Aleppo");

        //-----------------------------------------------------------------------------
        //Read the document that you just updated in two ways : finding by the city name, and then by the country code
        await findOneCityByName(client, "New Aleppo");
        await findOneCityByCountryCode(client, "SYR");

        //-----------------------------------------------------------------------------
        //Delete the city
        await deleteCityByName(client, "New Aleppo");
        await findOneCityByName(client, "New Aleppo");
    } catch (error) {
        console.log(error);
        await client.close();
    } finally {
        await client.close();
    }
}
main().catch(console.err);

async function createCity(client, newCity) {
    const result = await client
        .db("new_world")
        .collection("city")
        .insertOne(newCity);
    console.log(`New City created with the following id:${result.insertedId}`);
}

async function findOneCityByName(client, nameOfCity) {
    const result = await client
        .db("new_world")
        .collection("city")
        .findOne({ name: nameOfCity });
    if (result) {
        console.log(
            `Found a city in the collection with name '${nameOfCity}':`
        );
        console.log(result);
    } else {
        console.log(`No city found with the name '${nameOfCity}'`);
    }
}

async function findOneCityByCountryCode(client, codeOfCountry) {
    const result = await client
        .db("new_world")
        .collection("city")
        .findOne({ countryCode: codeOfCountry });
    if (result) {
        console.log(
            `Found a city in the collection with country code '${codeOfCountry}':`
        );
        console.log(result);
    } else {
        console.log(`No city found with the country code '${codeOfCountry}'`);
    }
}

async function updateCityByName(client, nameOfCity, updatedProperties) {
    const result = await client
        .db("new_world")
        .collection("city")
        .updateOne({ name: nameOfCity }, { $set: updatedProperties });

    console.log(`${result.matchedCount} city(ies) matched the query criteria`);
    console.log(`${result.modifiedCount} city(ies) was/were updated`);
}

async function deleteCityByName(client, nameOfCity) {
    const result = await client
        .db("new_world")
        .collection("city")
        .deleteOne({ name: nameOfCity });

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}