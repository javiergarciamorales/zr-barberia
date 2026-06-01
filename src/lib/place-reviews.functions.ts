import { createServerFn } from "@tanstack/react-start";

const PLACE_ID = "ChIJn1Vq7ktJQg0RMsk9Lgk_9F0";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type PlaceReview = {
  text: string;
  rating: number;
  authorName: string;
  authorPhoto?: string;
  relativeTime: string;
  publishTime: string;
};

export type PlaceData = {
  rating: number;
  userRatingCount: number;
  reviews: PlaceReview[];
};

export const getPlaceData = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlaceData> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const gmKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!lovableKey) throw new Error("LOVABLE_API_KEY not configured");
    if (!gmKey) throw new Error("GOOGLE_MAPS_API_KEY not configured");

    const res = await fetch(
      `${GATEWAY_URL}/places/v1/places/${PLACE_ID}?languageCode=es`,
      {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": gmKey,
          "X-Goog-FieldMask": "id,rating,userRatingCount,reviews",
        },
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Google Places error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        rating?: number;
        text?: { text?: string };
        originalText?: { text?: string };
        publishTime?: string;
        relativePublishTimeDescription?: string;
        authorAttribution?: { displayName?: string; photoUri?: string };
      }>;
    };

    const reviews: PlaceReview[] = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 4 && (r.text?.text || r.originalText?.text))
      .map((r) => ({
        text: (r.text?.text || r.originalText?.text || "").trim(),
        rating: r.rating ?? 5,
        authorName: r.authorAttribution?.displayName ?? "Cliente",
        authorPhoto: r.authorAttribution?.photoUri,
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
      }))
      .sort((a, b) => (b.publishTime || "").localeCompare(a.publishTime || ""))
      .slice(0, 5);

    return {
      rating: data.rating ?? 5,
      userRatingCount: data.userRatingCount ?? 0,
      reviews,
    };
  },
);
