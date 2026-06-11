import { Suspense } from "react";
import AdminEditorClient from "../AdminEditorClient";

export async function generateStaticParams() {
  return [{ id: "new" }];
}

export const metadata = {
  title: "Admin Edit Story - SuccessWikis",
};

export default function AdminEditorSlugPage() {
  return (
    <Suspense fallback={<div>Loading Editor...</div>}>
      <AdminEditorClient />
    </Suspense>
  );
}
