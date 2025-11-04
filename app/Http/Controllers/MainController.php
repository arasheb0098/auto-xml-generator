<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MainController extends Controller
{
    public function Index(){
		$PageData = array(
			'PageTitle' => 'Auto .XML Generator',
		);

		return view('index',['PageData' => $PageData]);
	}
	
    public function GetAutoName(Request $Request){
		/* Validation */
		$Request->validate(
			[
				'full_file_name' => 'required'
			]
		);
		
		$FullFileName = $Request->full_file_name;
		$GetFileName = $this->FixFileName($FullFileName);
		
		return response()->json(['status' => 'success','fixed_file_name' => $GetFileName]);
	}
	
	// Fix Movie File Name By AI Function
	public function FixFileName($FileName){
        $PROMPT =
<<<PROMPT
		You are an expert movie title normalizer and corrector.

		You are given the name of a movie file. The file name may contain:
		- Extra or irrelevant details (Resolution, Codecs, Encoders, Language, etc.)
		- Misspellings or typing errors in the movie title
		- Random dots, underscores, or dashes between words
		- Release year or not
		- Any other noisy text

		---

		### Your Task:
		1. Carefully analyze the given file name.
		2. Identify the closest matching real or upcoming movie that exists or is publicly known (even if not yet released).
		Be tolerant of minor misspellings, unofficial subtitles, or unreleased titles — if the movie is clearly identifiable or clearly related to an existing franchise (for example, “Final Destination Bloodlines” → “Final Destination 6”), output the most likely correct title and year instead of returning “NOT Found”.
		3. Correct any spelling mistakes or misplaced words.
		4. Extract **only** the correct English title and its release year.
		5. Absolutely **never** include any disallowed or special characters in the final output.

		---

		### Step-By-Step Reasoning (Internal Process):
		- Step 1: Clean and normalize the filename (Remove Dots, Dashes, Resolution Info, etc.).
		- Step 2: Identify the possible movie title words.
		- Step 3: Guess and correct possible typos (e.g. “Conjuiring” → “Conjuring”).
		- Step 4: Cross-check whether such a movie exists; if yes, continue.
		- Step 5: If the movie name exists, extract or infer its **most likely release year**.
		- Step 6: Format the title and year according to the rules below.

		Do **NOT** output your reasoning — Only the final formatted result.

		---

		### Formatting & Normalization Rules:
		1. Title must be in **English**, in **Capitalized Case** (e.g. “The Matrix”).
		2. Known acronyms remain **UPPERCASE** (e.g. “DC”, “FBI”).
		3. Replace the word “and” with “&”.
		4. Convert Roman numerals (I, II, III, IV, etc.) to Arabic numerals (1, 2, 3, 4...).
		5. **Remove or Replace** the following characters if they exist in the real title:
		`: , . / \ * " < > | ?`
		- Replace `:` and `,` with a single **space**.
		- Remove all other symbols completely.
		6. Output must include only the **title**, a single **space**, and the **4-digit release year**.

		---

		### Examples:
		Input → Output    
		- `Avatr.2009.1080p.BluRay.x264` → `Avatar 2009`  
		- `Spider-Man.No.Way.Home.2021.1080p` → `Spider-Man No Way Home 2021`  
		- `The.Good.The.Bad.And.The.Ugly.1966.REMASTERED` → `The Good The Bad & The Ugly 1966`

		---

		If no valid or close movie can be confidently identified, return exactly:
		`Movie Name NOT Found!`

		---

		Here is the file name to process:
		{$FileName}

		Return **only** the final formatted result — Nothing else.
PROMPT;

        $API_KEY = config('services.avalai.key');
        $API_URL = config('services.avalai.url');
		
		$GetPrompt = $PROMPT;
		$Result;
		
        $API_CONFIG = [
            'model' => 'gpt-4o',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an intelligent and detail-oriented movie title normalizer. Your purpose is to extract the correct movie title and its release year from messy or complex file names that may include irrelevant data such as resolution, language, codec, or group tags. Always verify that the movie exists and return only the clean, properly capitalized English title followed by its 4-digit release year.'
                ],
                [
					'role' => 'user',
					'content' => $PROMPT
				]
            ],
        ];

        $Response = Http::withHeaders(['Authorization' => 'Bearer ' . $API_KEY])->post($API_URL, $API_CONFIG);
		
		if ($Response->failed()) {
			$CallBack = $Response->json();
			$CallBackResult = $CallBack['error']['message'] ?? 'SUCCESS';
		} else {
			$CallBack = $Response->json();
			$CallBackResult = $CallBack['choices'][0]['message']['content'] ?? 'ERROR';
		}
		
		$InvalidChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];
		$Result = str_replace($InvalidChars,'',$CallBackResult);
		
		return $Result;
    }
}