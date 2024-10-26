import { exec } from "child_process";

// Função para rodar comandos no terminal usando pnpm ou npm
function runCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            resolve();
        });
    });
}

const dbSrc = "src/infra/databases"
runCommand(`typeorm migration:generate -d ${dbSrc}/sql.provider.ts ${dbSrc}/migrations/${process.argv[3]}`)
    .then(() => console.log("Comando executado com sucesso!"))
    .catch((err) => console.error("Falha ao executar o comando:", err));
