import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Fade,
  Chip,
} from "@mui/material";

function API() {
  const [selectedNumber, setSelectedNumber] = useState(25);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${selectedNumber}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedNumber]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #ffb6c1, #f8bbd0, #e1bee7, #bbdefb)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 10s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        "@keyframes gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Card
            sx={{
              p: 4,
              borderRadius: "25px",
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 25px rgba(0, 0, 0, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.4)",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 30px rgba(0, 0, 0, 0.25)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)",
                opacity: 0.5,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#5e35b1",
                mb: 2,
              }}
            >
              Pokémon Explorer ⚡
            </Typography>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="pokemon-select-label">
                Choose a Pokémon
              </InputLabel>
              <Select
                labelId="pokemon-select-label"
                id="pokemon-select"
                value={selectedNumber}
                label="Choose a Pokémon"
                onChange={(e) => setSelectedNumber(e.target.value)}
              >
                <MenuItem value={1}>1 - Bulbasaur 🌿</MenuItem>
                <MenuItem value={3}>3 - Venusaur 🌸</MenuItem>
                <MenuItem value={4}>4 - Charmander 🔥</MenuItem>
                <MenuItem value={5}>5 - Charmeleon 🔥</MenuItem>
                <MenuItem value={7}>7 - Squirtle 💧</MenuItem>
                <MenuItem value={25}>25 - Pikachu ⚡</MenuItem>
                <MenuItem value={39}>39 - Jigglypuff 🎵</MenuItem>
                <MenuItem value={150}>150 - Mewtwo 💫</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Fade in={!loading}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ mt: 1, color: "#6a1b9a", fontWeight: "bold" }}
                    >
                      {pokemonData?.name
                        ? pokemonData.name.toUpperCase()
                        : "No Data"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#333",
                        mt: 1,
                        fontSize: "1.1rem",
                      }}
                    >
                      Moves: <b>{pokemonData?.moves?.length || 0}</b>
                    </Typography>

                    {/* Pokémon Type Badges */}
                    <Box sx={{ mt: 2 }}>
                      {pokemonData?.types?.map((t) => (
                        <Chip
                          key={t.type.name}
                          label={t.type.name.toUpperCase()}
                          color="secondary"
                          sx={{
                            m: 0.5,
                            fontWeight: 600,
                            background:
                              "linear-gradient(135deg, #ce93d8, #ba68c8)",
                            color: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          }}
                        />
                      ))}
                    </Box>

                    {/* Floating Pokémon Image */}
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "center",
                        animation: "float 3s ease-in-out infinite",
                        "@keyframes float": {
                          "0%, 100%": { transform: "translateY(0)" },
                          "50%": { transform: "translateY(-10px)" },
                        },
                      }}
                    >
                      <img
                        src={pokemonData?.sprites?.front_default}
                        alt={pokemonData?.name}
                        width="150"
                        height="150"
                        style={{
                          filter:
                            "drop-shadow(0px 5px 12px rgba(0,0,0,0.3))",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                </Fade>
              )}
            </Box>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}

export default API;
