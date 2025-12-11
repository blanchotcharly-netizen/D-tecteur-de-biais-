<script src="https://js.puter.com/v2/"></script>

<script>
document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const input = document.getElementById("inputText").value.trim();
    if (!input) return alert("Colle un article avant d’analyser.");

    try {
        const prompt = `
Tu es un outil d’analyse journalistique.

Analyse l’article selon les étapes suivantes :

1) Détection des biais politiques, émotionnels et idéologiques.
2) Liste complète des mots et tournures connotés + explication.
3) Analyse des citations et des sources (coloration politique si explicite).
4) Détection des frames (sécurité, menace, moralisation, compassion, etc.).
5) Analyse du style d’écriture.
6) Score de neutralité sur 100 (100 = totalement neutre).
7) Données au format JSON STRICT :

{
 "neutrality": 0,
 "biases": ["..."],
 "connotations": [{ "mot": "...", "explication": "..." }],
 "sources": [{ "citation": "...", "analyse": "..." }],
 "frames": ["..."]
}
`;

        const response = await puter.ai.chat(prompt, {
            model: "gemini-3-pro-preview" // modèle Puter côté web
        });

        // Parse JSON renvoyé par l'IA
        const result = JSON.parse(response);

        // Affichage
        document.getElementById("results").classList.remove("hidden");
        document.getElementById("neutralityScore").textContent = result.neutrality + "%";
        document.getElementById("biasList").innerHTML =
            result.biases.map(b => `<li>${b}</li>`).join("");
        document.getElementById("connotationList").innerHTML =
            result.connotations.map(c => `<li><strong>${c.mot}</strong> : ${c.explication}</li>`).join("");
        document.getElementById("sourceList").innerHTML =
            result.sources.map(s => `<li><strong>${s.citation}</strong> : ${s.analyse}</li>`).join("");
        document.getElementById("frameList").innerHTML =
            result.frames.map(f => `<li>${f}</li>`).join("");

    } catch (err) {
        console.error(err);
        alert("Erreur : l’IA n’a pas répondu. Vérifie la console.");
    }
});
</script>

