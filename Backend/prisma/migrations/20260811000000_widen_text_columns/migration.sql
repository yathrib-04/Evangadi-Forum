-- Question bodies and answers were VARCHAR(191), which silently truncated
-- anything longer than a couple of sentences. Widen both to TEXT.
ALTER TABLE `questions` MODIFY `description` TEXT NOT NULL;

ALTER TABLE `answers` MODIFY `answer` TEXT NOT NULL;
