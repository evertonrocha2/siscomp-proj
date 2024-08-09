import axios from "axios";

export async function getViaCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const response = await axios.get(url);
  return response.data;
}
