# Запуск в локальной сети через ProGet

Для запуска необходимо прописать в терминале:
`npm config set registry https://proget.novator.ru/npm/internal-npm/` (API endpoint URL новаторского нпм сервера)

//Если возникает ошибка с сертификатами то нужно прописать `npm config set strict-ssl=false`

После чего:
`npm install`

И:
`npm run dev`

