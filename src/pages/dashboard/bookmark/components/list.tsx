import React from "react";

import { useBookmarks } from "../hooks/query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookieService } from "@/modules/cookie";
import { useUser } from "@/query/use-user";

const BookmarkList: React.FC = () => {
  const { user } = useUser();
  const { data } = useBookmarks({
    user_id: user!.userId,
  });

  return (
    <>
      {!data?.bookmarks && <p>no data</p>}
      {data?.bookmarks && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] overflow-he">Domain</TableHead>
              <TableHead className="w-[400px]">Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.bookmarks.map((bookmark, idx) => (
              <TableRow key={idx}>
                <TableCell>{bookmark.url}</TableCell>
                <TableCell>{bookmark.title}</TableCell>
                <TableCell className="text-right">
                  <div className="flex float-end hover:cursor-pointer">
                    <EXICON />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

function EXICON() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trash-2"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

export { BookmarkList };
