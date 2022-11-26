import "./Main.css";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import PaginationHOC from "../components/PaginationHOC";
import IPokemonData from "../interfaces/IPokemonData";
import IPokemonInfo from "../interfaces/IPokemonInfo";
import { getPokemons } from "../apis/getPokemons";
import MUIModal from "../components/Modal";
import PokemonInfo from "../components/PokemonInfo";
import CircularProgress from "@mui/material/CircularProgress";
import { getOffsetAndLimit } from "../utilities/getOffsetAndLimit";
import { getPokemonByName } from "../apis/getPokemonByName";
import { getCurrentPokemon } from "../apis/getCurrentPokemon";

const Main = () => {
    const [pokemonData, setPokemonData] = useState<IPokemonData>({count: 0, results: []});
    const [open, setOpen] = useState(false);
    const [currentPokemon, setCurrentPokemon] = useState<IPokemonInfo | undefined>();
    const [searchedValue, setSearchedValue] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = (offset?: number, limit?: number) => {
        setLoading(true);
        getPokemons(offset, limit)
            .then((response: IPokemonData) => {
                const data: IPokemonData = {
                    count: response.count,
                    results: response.results
                };
                const urls = data.results?.map(result => result.url);
                if (urls) {
                    setLoading(true);
                    Promise.all(urls?.map(url => getCurrentPokemon(url)))
                        .then((response: IPokemonInfo[]) => {
                            const pokemonData: IPokemonData = {
                                count: data.count,
                                results: response.map((pokemon) => ({
                                    ...pokemon,
                                    name: pokemon.species.name,
                                    url: pokemon.species.url,
                                    imgUrl: pokemon.sprites.front_default
                                }))
                            };
                            setPokemonData(pokemonData);
                        })
                        .catch(err => console.error(err))
                        .finally(() => setLoading(false));
                }
            })
            .catch(err => console.error(err))
    };

    useEffect(() => fetchData(), []);
    
    useEffect(() => {
        if (searchedValue.trim().length >= 3) {
            const timerId = setTimeout(() => {
                setLoading(true);
                getPokemonByName(searchedValue)
                    .then((response: IPokemonInfo) => {
                        const data: IPokemonData = {
                            count: 0,
                            results: [{
                                ...response,
                                name: response.species.name,
                                url: response.species.url,
                                imgUrl: response.sprites.front_default
                            }]
                        };
                        setPokemonData(data)
                    })
                    .catch(err => {
                        console.error(err);
                        const data: IPokemonData = {
                            count: 0,
                            results: []
                        };
                        setPokemonData(data);
                    })
                    .finally(() => setLoading(false));
            }, 700);
            return () => clearTimeout(timerId);
        } else {
            const timerId = setTimeout(fetchData, 700);
            return () => clearTimeout(timerId);
        }
    }, [searchedValue]);

    const _limitCount = 16;

    const changePageHandler = (number: number): void => {
        if (page === number) return;
        const { offset, limit } = getOffsetAndLimit(number, _limitCount, pokemonData.count);
        setLoading(true);
        fetchData(offset, limit);
        setPage(number);
    };

    return (
        <>
            <main className="main">
                <div className="searchbox">
                    <input
                        type="text"
                        className="search-input"
                        value={searchedValue}
                        placeholder="Search pokemon..."
                        onChange={(e) => setSearchedValue(e.target.value)}
                    />
                </div>
                {loading
                    ? <CircularProgress size={50} color={"primary"} className={"progress"} />
                    : pokemonData.results?.length === 0 
                        ? <p className="no-items-text">No Pokemons Found</p>
                        : (
                            <>
                                <div className="cards">
                                    <div className="cards-box">
                                        {pokemonData.results?.map((item) => (
                                            <Card
                                                key={item.url}
                                                card={item}
                                                onViewMore={(card: IPokemonInfo): void => {
                                                    setCurrentPokemon(card);
                                                    setOpen(true);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <PaginationHOC
                                    listLength={pokemonData.results?.length || 0}
                                    page={page}
                                    handleChangePage={(number) => changePageHandler(number)}
                                    count={pokemonData.count}
                                    limitCountNumber={_limitCount}
                                />
                            </>
                        )}
            </main>
            <MUIModal isOpen={open} closeModal={() => setOpen(false)}>
                <PokemonInfo pokemonInfo={currentPokemon} />
            </MUIModal>
        </>
    );
};

export default Main;