import { auth } from "@/auth"
import { Suspense } from "react";

export default async function Home() {
  const session = await auth()


  return (

    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(session, null, 2)}
      </Suspense>
    </div>
  );
}
