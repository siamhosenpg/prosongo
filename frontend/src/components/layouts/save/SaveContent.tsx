"use client";

import React from "react";
import { useSavedItems } from "@/hook/save/useSavedItems";
import { useDefaultCollection } from "@/hook/save/useCollections";
import Postbox from "@/components/ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";

/* =======================
   ✅ Type Definitions
======================= */

interface DefaultCollection {
  collectionId: string;
}

interface SavedItem {
  _id: string;
  postId: any; // যদি Post এর আলাদা টাইপ থাকে তাহলে সেটা বসাবে
}

/* =======================
   ✅ Component
======================= */

const SaveContent: React.FC = () => {
  const {
    data: defaultCol,
    isLoading: colLoading,
    isError: colError,
  } = useDefaultCollection() as {
    data: DefaultCollection | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const collectionId: string | undefined = defaultCol?.collectionId;

  const {
    data: savedItems,
    isLoading: savedLoading,
    isError: savedError,
  } = useSavedItems(collectionId!) as {
    data: SavedItem[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const isLoading = colLoading || savedLoading;
  if (colError) return <div>Error loading collection</div>;

  if (savedError) return <div>Error loading saved posts</div>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1">
        {isLoading && <PostcardLoading />}
        {savedItems?.map((item: SavedItem) => {
          return (
            <div key={item._id}>
              <Postbox post={item.postId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SaveContent;
