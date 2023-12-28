"use client";

import Image from "next/image";
import Login from "../../components/login-btn";
import { useRef, useState } from "react";
import { createHash } from "crypto";

import { storage } from "../../firebase/initFirebase";

import { ref, uploadBytes } from "firebase/storage";
export default function Home() {
  const [file, setFile] = useState<any>();
  const [nameFile, setNameFile] = useState<any>();
  const fileInputRef = useRef(null);
  //TODO: o storage precisa que essa referencia seja criada no root e ela não é mudada
  // então tenho que criar uma função a parte que receba os parametros e crie essa referência
  // com base nesses parametros
  let storageRef = ref(storage, "pdfs");

  const handleChange = (e: any) => {
    const arquivo = e.target.files[0];
    const nome = e.target.value.split("\\").slice(-1)[0];
    console.log(file);
    console.log("nome", nome);

    storageRef = ref(storage, nome);

    setFile(arquivo);
  };
  //por alguma razão ta criando sempre o mesmo hash, talvez porque todo objeto file seja igual em javascript?
  const hash = (arquivo: any) => {
    return createHash("sha256").update(arquivo).digest("hex");
  };

  const handleSubmit = () => {
    if (file) {
      console.log(file);

      const resultHash = hash(file);

      console.log("hash", resultHash);

      const metadata = {
        contentType: "file/pdf",
        hash: resultHash,
      };
      uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log("Arquivo foi upado", snapshot);
      });
    }
  };

  return (
    <>
      <h1 className="text-4xl">Adicione um PDF</h1>
      <form className="flex flex-col gap-2">
        <label htmlFor="pdfinput"> Escolha um pdf </label>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
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
    </>
  );
}
