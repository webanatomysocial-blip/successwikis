import { Suspense } from "react";
import AdminEditorClient from "./AdminEditorClient";

export const metadata = {
  title: "Admin Editor - SuccessWikis",
};

export default function AdminEditorPage() {
  return (
    <Suspense fallback={<div>Loading Editor...</div>}>
      <AdminEditorClient />
    </Suspense>
  );
}
