import {corsair} from "../corsair"

async function main() {
  await corsair.keys.gmail.set_client_id(process.env.GOOGLE_CLIENT_ID!);
  await corsair.keys.gmail.set_client_secret(process.env.GOOGLE_CLIENT_SECRET!);
  await corsair.keys.googlecalendar.set_client_id(process.env.GOOGLE_CLIENT_ID!);
  await corsair.keys.googlecalendar.set_client_secret(process.env.GOOGLE_CLIENT_SECRET!);
  console.log('OAuth credentials configured');
}

main()