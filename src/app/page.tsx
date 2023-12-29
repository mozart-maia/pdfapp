"use client";

import { useEffect, useRef, useState } from "react";

import { storage } from "../../firebase/initFirebase";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { saveAs } from "file-saver";

// import { writeFileSync } from "fs";
import { promises as fs } from "fs";
// import { assinarPDF } from "@/utils/assinaturaPDF";

export default function Home() {
  const [file, setFile] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [listFiles, setListFiles] = useState<any>();
  const { data: session } = useSession();
  const [nameFile, setNameFile] = useState<any>();

  const fileInputRef = useRef(null);

  const handleChange = (e: any) => {
    const arquivo = e.target.files[0];
    const nome = e.target.value.split("\\").slice(-1)[0];
    console.log(file);
    console.log("nome", nome);
    setNameFile(nome);

    setFile(arquivo);
  };

  const handleSubmit = async () => {
    if (file) {
      // const fileSigned = await assinarPDF(file, email);
      const storageRef = ref(storage, `${email}\\${nameFile}`);
      const metadata = {
        contentType: "application/pdf",
      };
      uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log("Arquivo foi upado", snapshot);
      });
      alert("Arquivo enviado para nuvem!");
    }
  };

  const downloadFile = async (file: any) => {
    const storageRef = ref(storage, `${file}`);
  };

  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email);
    }
  }, [email, session]);

  async function listFilesByPartialName(partialName: string) {
    const storageRef = ref(storage, "gs://auth-dna-e02f3.appspot.com"); // Substitua pelo caminho desejado

    try {
      const files = await listAll(storageRef);

      // Filtrar os arquivos com base na parte do nome
      const filteredFiles = files.items.filter((file) =>
        file.name.includes(partialName)
      );

      // Retornar os nomes dos arquivos correspondentes
      const fileNames = filteredFiles.map((file) => file.name);

      return fileNames;
    } catch (error) {
      console.error("Erro ao listar os arquivos:", error);
      return [];
    }
  }

  const renderFiles = async () => {
    console.log("email:", email);
    const files = await listFilesByPartialName(email);
    setListFiles(files);
    console.log(listFiles);
  };

  const saveFileFromStorage = async (element: any) => {
    getDownloadURL(ref(storage, element))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = async (event) => {
          const blob = xhr.response;
          const nblob = new Blob([blob], { type: "application/pdf" });
          saveAs(blob, element);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {session ? (
        <>
          <div className="m-auto self-center text-center">
            <h1 className="bg-green-950 text-slate-300">
              Logado como: {session?.user?.email}{" "}
            </h1>
            <h1 className="text-4xl">Adicione um PDF</h1>

            <form className="flex flex-col gap-2">
              <label htmlFor="pdfinput"> Escolha um pdf: </label>
              <input
                type="file"
                accept="application/pdf"
                // ref={fileInputRef}
                placeholder="Escolha um pdf"
                name="pdfinput"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="border rounded-md p-2 w-1/4 text-gray-300 bg-blue-800"
              >
                Enviar arquivo
              </button>
            </form>
            <hr />

            <button
              className="bg-blue-300 text-slate-800 w-1/6 rounded-lg"
              onClick={() => {
                renderFiles();
              }}
            >
              {" "}
              Mostrar arquivos upados{" "}
            </button>
            <ul>
              {
                listFiles?.map((el: any) => (
                  <li
                    onClick={() => {
                      saveFileFromStorage(el);
                      console.log("li", el);
                    }}
                  >
                    <a href="#">{el}</a>
                  </li>
                ))
                // listFiles?.forEach((element: any) => {
                //   <li onClick={() => console.log("li", element)}>
                //     <a href="#">{element}</a>
                //   </li>;
                // })
              }
            </ul>
          </div>
        </>
      ) : (
        <>
          <h1 className="bg-red-950 text-slate-300"> Não logado </h1>{" "}
          <button
            className="bg-blue-300 text-slate-800 rounded-md p-2"
            onClick={() => {
              signIn("google");
              console.log("logando");
            }}
          >
            {" "}
            Clique aqui para logar
          </button>{" "}
        </>
      )}
    </>
  );
}
