import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./TablePage.module.css";
import Table from "../../Components/Table/Table";
import { PeopleData, FilmData, StarshipData, PlanetData, TableData, VehiclesData, SpeciesData } from "../../types/FetchedTables";

// Define a mapping for table names to the corresponding data type
type TableNameToData = {
    people: PeopleData;
    films: FilmData;
    starships: StarshipData;
    planets: PlanetData;
    vehicles: VehiclesData;
    species: SpeciesData;
};

export default function StarWarsTable() {
    const [data, setData] = useState<TableData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const { tableName } = useParams<{ tableName: keyof TableNameToData }>(); // Type-safe useParams

    // Get page from searchParams, fallback to 1 if not set
    const page = parseInt(searchParams.get("page") || "1", 10);

    // Fetch data whenever tableName or page changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");

            const cachedData = JSON.parse(localStorage.getItem(`starWarsData-${tableName}-page-${page}`) || "0");
            const cachedTotalPages = JSON.parse(localStorage.getItem("starWarsTotalPages") || "0");

            if (cachedData && cachedTotalPages) {
                console.log(cachedData);
                setData(cachedData);
                setTotalPages(cachedTotalPages);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://swapi.dev/api/${tableName}/?page=${page}`);
                const results = response.data.results;
                setData(results);
                setTotalPages(Math.ceil(response.data.count / 10));

                localStorage.setItem(`starWarsData-${tableName}-page-${page}`, JSON.stringify(results));
                localStorage.setItem("starWarsTotalPages", Math.ceil(response.data.count / 10).toString());
            } catch (err) {
                console.log(err);
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (tableName) {
            fetchData();
        }
    }, [page, tableName]); // Depend on page and tableName

    const handleNextPage = () => {
        if (page < totalPages) {
            setSearchParams({ page: (page + 1).toString() });
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setSearchParams({ page: (page - 1).toString() });
        }
    };

    // Dynamically render table headers based on the table name
    const renderTableHeaders = () => {
        switch (tableName) {
            case "films":
                return (
                    <>
                        <span>Title</span>
                        <span>Episode</span>
                        <span>Opening Crawl</span>
                        <span>Director</span>
                        <span>Producer</span>
                    </>
                );
            case "people":
                return (
                    <>
                        <span>Name</span>
                        <span>Mass</span>
                        <span>Height</span>
                        <span>Hair Color</span>
                        <span>Skin Color</span>
                    </>
                );
            case "starships":
                return (
                    <>
                        <span>Name</span>
                        <span>Model</span>
                        <span>Manufacturer</span>
                        <span>Cost in Credits</span>
                        <span>Length</span>
                    </>
                );
            case "planets":
                return (
                    <>
                        <span>Name</span>
                        <span>Population</span>
                        <span>Climate</span>
                        <span>Gravity</span>
                    </>
                );
            case "vehicles":
                return (
                    <>
                        <span>Name</span>
                        <span>Model</span>
                        <span>Manufacturer</span>
                        <span>Length</span>
                    </>
                );
            case "species":
                return (
                    <>
                        <span>Name</span>
                        <span>Classification</span>
                        <span>Designation</span>
                        <span>Average height</span>
                        <span>Skin colors</span>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <span className={styles.loader}></span>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.tableContainer}>
                    <Table<TableData>
                        data={data} // Dynamic data passed to Table
                        handlePrev={handlePrevPage}
                        handleNext={handleNextPage}
                        currPage={page}
                        disableNext={page >= totalPages}
                    >
                        <li className={styles.tableHeader}>{renderTableHeaders()}</li>
                    </Table>
                </div>
            )}
        </div>
    );
}
