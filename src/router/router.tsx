import React, { PropsWithChildren } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useUser } from "@/hooks/quries/user";
import Auth from "@/pages/auth";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import DashBoard from "@/pages/dashboard";
import Bookmark from "@/pages/dashboard/bookmark";
import AddBookmarkToCollectionDialog from "@/pages/dashboard/bookmark/components/modal/add-bookmark-to-collection-dialog";
import CreateBookmarkDialog from "@/pages/dashboard/bookmark/components/modal/create-bookmark-dialog";
import Collections from "@/pages/dashboard/collections";
import Collection from "@/pages/dashboard/collections/[collection]";
import CreateCollectionDialog from "@/pages/dashboard/collections/components/modal/create-collection-dialog";
import DeleteCollectionDialog from "@/pages/dashboard/collections/components/modal/delete-collection-dialog";
import EditCollectionDialog from "@/pages/dashboard/collections/components/modal/edit-collection.dialog";
import Settings from "@/pages/dashboard/settings";
import Account from "@/pages/dashboard/settings/account";
import NotFound from "@/pages/notfound";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

const Router: React.FC = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <>
      {/* pages */}
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Navigate to="/auth/login" />}></Route>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="login" index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Bookmark />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="collections/:collectionId" element={<Collection />} />
          <Route path="collections" element={<Collections />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/account" element={<Account />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* modals */}
      {previousLocation && (
        <Routes>
          <Route
            path="/modal/create/bookmarks"
            element={<CreateBookmarkDialog />}
          />
          <Route
            path="/modal/add/bookmarks/:bookmarkId"
            element={<AddBookmarkToCollectionDialog />}
          />
          <Route
            path="/modal/create/collections"
            element={<CreateCollectionDialog />}
          />
          <Route
            path="/modal/edit/collections/:collectionId"
            element={<EditCollectionDialog />}
          />
          <Route
            path="/modal/delete/collections/:collectionId"
            element={<DeleteCollectionDialog />}
          />
        </Routes>
      )}
    </>
  );
};

export { Router };
