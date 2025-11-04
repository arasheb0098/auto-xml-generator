@include('content.header')

<div class="container py-5">
	<div class="row justify-content-center">
		<div class="col-md-5">
			<h2 class="title-box">Auto .XML Generator</h2>
			<div class="upload-box">
				<div class="upload-section">
					<div class="logo"><i class="bi bi-play-circle"></i></div>
					<div class="upload-hint text1">Drag & Drop Your Video Here</div>
					<div class="upload-hint text2">OR</div>
					<div class="upload-hint text3">Click To <span>Select</span> A Video File</div>
					<div class="upload-hint text4">Only Video Files Are Allowed! (MP4, MKV, WEBM, MOV, ...)</div>
				</div>
				<div class="result-section hide">
					<div class="logo"><i class="bi bi-check-circle"></i></div>
					<div class="upload-result">
						<div class="upload-hint file-name"><i class="bi bi-check-circle-fill"></i> File Name : <span></span></div>
						<div class="upload-hint file-format"><i class="bi bi-check-circle-fill"></i> File Format : <span></span></div>
						<div class="upload-hint file-size"><i class="bi bi-check-circle-fill"></i> File Size : <span></span></div>
						<div class="upload-hint file-length"><i class="bi bi-check-circle-fill"></i> File Length : <span></span></div>
					</div>
					<div class="remove-btn" title="Remove File" data-bs-toggle="tooltip" data-bs-placement="bottom">
						<i class="bi bi-x-circle-fill"></i>
					</div>
				</div>
				<input class="file-input" type="file" name="file-input" accept="video/*,.mkv,video/x-matroska"/>
			</div>
			<div class="data-box">
				<!-- INTERVAL SECTION -->
				<div class="input-group interval-box">
					<!-- NAME BOX-->
					<span class="input-group-text name-input">SPLIT EVERY</span>
					<!--/NAME BOX-->
					<!-- INTERVAL INPUT -->
					<input type="number" name="interval-input" class="form-control interval-input" placeholder="Enter Minutes" value="10" min="1" max="1000">
					<!--/INTERVAL INPUT -->
					<!-- MINUTES BOX -->
					<div class="min-section">MINUTES</div>
					<!--/MINUTES BOX -->
					<!-- INCREASE & DECREASE BOX -->
					<!-- DECREASE BUTTON -->
					<button class="btn btn-outline-primary decrease-btn" type="button" title="-5" data-bs-toggle="tooltip" data-bs-placement="top">
					<i class="bi bi-caret-down-fill"></i>
					</button>
					<!--/DECREASE BUTTON -->
					<!-- INCREASE BUTTON -->
					<button class="btn btn-outline-primary increase-btn" type="button" title="+5" data-bs-toggle="tooltip" data-bs-placement="top">
					<i class="bi bi-caret-up-fill"></i>
					</button>
					<!--/INCREASE BUTTON -->
					<!--/INCREASE & DECREASE BOX -->
				</div>
				<!--/INTERVAL SECTION -->
				<!-- CHAPTER SECTION -->
				<div class="input-group chapter-box">
					<!-- NAME BOX-->
					<span class="input-group-text name-input">Chapter</span>
					<!--/NAME BOX-->
					<!-- CHAPTER INPUT -->
					<input type="text" name="chapter-input" class="form-control chapter-input" placeholder="Enter Chapter Name" value="Chapter">
					<!--/CHAPTER INPUT -->
				</div>
				<!--/CHAPTER SECTION -->
				<!-- LANGUAGE SECTION -->
				<div class="input-group lang-box">
					<!-- NAME BOX-->
					<span class="input-group-text name-input">Language</span>
					<!--/NAME BOX-->
					<!-- LANGUAGE INPUT -->
					<div class="select-box">
						<select type="text" name="lang-input" class="form-select lang-input has-not-value" aria-label="Enter Language Name">
							<option value="" selected disabled hidden>Enter Language Name</option>
						</select>
					</div>
					<!--/LANGUAGE INPUT -->
				</div>
				<!--/LANGUAGE SECTION -->
				<!-- FILE NAME SECTION -->
				<div class="input-group name-box">
					<!-- NAME BOX-->
					<span class="input-group-text name-input">File Name</span>
					<!--/NAME BOX-->
					<!-- FILE NAME INPUT -->
					<input type="text" name="filename-input" class="form-control filename-input" value="CHAPTERS" placeholder="Enter File Name" >
					<!--/FILE NAME INPUT -->
					<!-- LOADING BOX -->
					<div class="loading-section hide"><i class="bi bi-openai loading-icon"></i></div>
					<!--/LOADING BOX -->
					<!-- CHECKBOX BOX -->
					<div class="checkbox-section" href="{{route('GetAutoNameURL')}}">
						<input type="checkbox" name="autoname-input" class="form-check-input autoname-input" value="AUTO" title="Auto Name Generator (AI)" data-bs-toggle="tooltip" data-bs-placement="top">
					</div>
					<!--/CHECKBOX BOX -->
				</div>
				<!--/FILE NAME SECTION -->
			</div>
			<div class="button-box">
				<div class="row">
					<div class="col-6">
						<button type="button" name="reset-btn" class="btn btn-outline-secondary reset-btn" title="Reset Default" data-bs-toggle="tooltip" data-bs-placement="bottom">Reset</button>
					</div>
					<div class="col-6">
						<button type="button" name="generate-btn" class="btn btn-outline-primary generate-btn">Generate!</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Bootstrap Modal Template -->
<div class="modal fade" id="ErrorModal" tabindex="-1" aria-labelledby="errorModalLabel" inert>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header bg-danger text-white">
				<h5 class="modal-title" id="errorModalLabel">Error</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body"></div>
			<div class="modal-footer d-flex justify-content-between align-items-center">
				<!-- Countdown Circle -->
				<div class="countdown-circle">
					<svg width="24" height="24">
						<circle cx="12" cy="12" r="10" stroke="#6c757d" stroke-width="2" fill="none"></circle>
					</svg>
					<span class="countdown-number text-muted small">0</span>
				</div>
			</div>
		</div>
	</div>
</div>

@include('content.footer')