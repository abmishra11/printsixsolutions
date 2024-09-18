"use client";

import { Button, Modal } from "flowbite-react";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShareSocial } from "react-share-social";

export default function ProductShareButton({ urlToShare }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button className="" onClick={() => setOpenModal(true)}>
        <Share2 />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Share this product with others</Modal.Header>
        <Modal.Body>
          <ShareSocial
            url={urlToShare}
            socialTypes={[
              "whatsapp",
              "facebook",
              "twitter",
              "linkedin",
              "email",
            ]}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
