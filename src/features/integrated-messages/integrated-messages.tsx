"use client";

import { Box, Skeleton, Stack } from "@mui/material";
import { Message } from "@shared/components";
import { throttle } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useLocalizationProvider } from "@/components/providers/localization-provider";
import { translate } from "@/lib/language";

import { openBackofficeLink } from "./helpers/open-backoffice-link";
import { useMessages } from "./hooks/useMessages";
import styles from "./integrated-messages.module.css";
import { MessagesNavigation } from "./messages-navigation";
import { IntegratedMessage } from "./types/messages";

const IntegratedMessagesConfig = {
  itemWidth: 336,
  itemHeight: 156,
  margin: 19,
};

export const IntegratedMessages = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { itemWidth, itemHeight, margin } = IntegratedMessagesConfig;
  const { data, loading } = useMessages();
  const { language } = useLocalizationProvider();

  useEffect(() => {
    if (carouselRef.current) {
      updateCarouselState();
    }
  }, [carouselRef]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0);

  const updateCarouselState = () => {
    if (carouselRef.current) {
      const { offsetWidth, scrollLeft } = carouselRef.current;
      setVisibleItemsCount(Math.ceil(offsetWidth / (itemWidth + margin)));
      setCurrentIndex(Math.floor((scrollLeft + margin / 2) / (itemWidth + margin)));
    }
  };

  const prev = () => scrollToIndex(currentIndex - 1);

  const next = () => scrollToIndex(currentIndex + 1);

  const scrollToIndex = (idx: number) => {
    if (!carouselRef.current || idx < 0 || idx > data.length - visibleItemsCount) {
      return;
    }
    const coordX: number = idx * (itemWidth + margin);
    carouselRef.current.scrollTo({ top: 0, left: coordX, behavior: "smooth" });
  };

  const messageClickHandler = (msg: IntegratedMessage) => openBackofficeLink(msg.clickUrl);

  return (
    <Box className={styles.container}>
      <Box
        ref={carouselRef}
        id="carousel"
        className={styles.carousel}
        onScroll={throttle(updateCarouselState, 50)}
      >
        {loading ? (
          <IntegratedMessageSkeleton />
        ) : (
          <Stack className={styles.carousel_inner} direction="row">
            {data.map((msg, i) => {
              return (
                <Box
                  key={i}
                  className={styles.message}
                  onClick={() => messageClickHandler(msg)}
                  sx={{ cursor: msg.clickUrl ? "pointer" : "default" }}
                >
                  <Message
                    title={translate(msg.title, language)}
                    text={translate(msg.text, language)}
                    textAlignment={msg.textAlignment}
                    width={itemWidth}
                    height={itemHeight}
                    backgroundImage={
                      <Image
                        src={encodeURI(msg.imageUrl)}
                        alt="Message background"
                        width={itemWidth}
                        height={itemHeight}
                      />
                    }
                  />
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>

      <MessagesNavigation
        data={data}
        visibleItemsCount={visibleItemsCount}
        currentIndex={currentIndex}
        loading={loading}
        next={next}
        prev={prev}
        scrollToIndex={scrollToIndex}
      ></MessagesNavigation>
    </Box>
  );
};

const IntegratedMessageSkeleton = () => {
  const { itemWidth, itemHeight, margin } = IntegratedMessagesConfig;
  return (
    <Stack direction={"row"}>
      {[1, 2, 3].map((i) => {
        return (
          <Skeleton
            variant="rectangular"
            key={i}
            sx={{ minWidth: `${itemWidth}px`, marginRight: `${margin}px`, borderRadius: "16px" }}
            width={itemWidth}
            height={itemHeight}
          />
        );
      })}
    </Stack>
  );
};
