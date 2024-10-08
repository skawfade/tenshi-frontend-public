export function getScoreBadgeColor({ score }: { score: number } ) {
    if (score < 5.5) {
        return "text-[#A7111A]";
    }

    if (score > 7.5) {
        return "text-[#0D905E]";
    }

    if (score > 5.5) {
        return "text-[#B17502]";
    }

    return "text-[#ff0000]";
}
