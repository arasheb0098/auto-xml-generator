$(function () {
	/* =================================================================== FUNCTIONS =================================================================== */

	// Show Message Function
	function ShowMessage(Message, Type = 'danger', Duration = 5) {
		// Select Modal Elements
		var Modal = $('#ErrorModal');
		var ModalTitle = Modal.find('.modal-title');
		var ModalBody = Modal.find('.modal-body');
		var CountDownNumber = Modal.find('.countdown-number');
		var ModalHeader = Modal.find('.modal-header');

		// Initialize Countdown Variables
		var CountDown = Duration;
		var Interval;

		// Default Title & Header Style
		var TitleText = 'Message';
		var HeaderClass = 'bg-secondary';

		// Determine Modal Title & Header Style Based On Message Type
		switch (Type) {
			case 'danger':
				TitleText = 'Error';
				HeaderClass = 'bg-danger text-white';
				break;
			case 'warning':
				TitleText = 'Warning';
				HeaderClass = 'bg-warning text-dark';
				break;
			case 'info':
				TitleText = 'Information';
				HeaderClass = 'bg-info text-dark';
				break;
			case 'success':
				TitleText = 'Success';
				HeaderClass = 'bg-success text-white';
				break;
		}

		// Update Modal Content & Appearance
		ModalTitle.text(TitleText);
		ModalBody.html(Message);
		ModalHeader.removeClass('bg-danger bg-warning bg-info bg-success bg-secondary text-dark text-white');
		ModalHeader.addClass(HeaderClass);
		CountDownNumber.text(CountDown);
		Modal.removeAttr('inert');

		// Initialize Bootstrap Modal Instance
		var BsModal = new bootstrap.Modal(Modal[0]);
		BsModal.show();

		// Fix Blur Issue On Modal Close
		Modal.off('hide.bs.modal.fixBlur').on('hide.bs.modal.fixBlur', function () {
			if (document.activeElement) {
				document.activeElement.blur();
			}
		});

		// Countdown Timer To Auto-Close Modal
		Interval = setInterval(function () {
			CountDown--;
			CountDownNumber.text(CountDown);
			if (CountDown <= 0) {
				clearInterval(Interval);
				if (document.activeElement) {
					document.activeElement.blur();
				}
				BsModal.hide();
			}
		}, 1000);

		// Reset & Cleanup After Modal Is Fully Hidden
		Modal.off('hidden.bs.modal.fixHidden').on('hidden.bs.modal.fixHidden', function () {
			clearInterval(Interval);
			Modal.attr('inert', '');
			document.body.focus();
		});
	}

	// Escape HTML Function
	function EscapeHTML(STR) {
		// Convert Special HTML Characters To Safe Encoded Entities
		return String(STR)
			.replace(/&/g, '&')
			.replace(/</g, '<')
			.replace(/>/g, '>')
			.replace(/"/g, '"')
			.replace(/'/g, "'");
	}

	// Check Interval Value Function
	function CheckIntervalValue() {
		// Get Input Value From Interval Input Field
		var Value = $('.data-box .interval-box .interval-input').val();
		if (Value === '' || Value == null) return;

		// Convert Input Value To Number
		var InputNumber = Number(Value);
		if (!Number.isFinite(InputNumber)) return;

		// Get Minimum & Maximum Limits From Input Attributes
		var Minimum = Number($('.data-box .interval-box .interval-input').attr('min'));
		var Maximum = Number($('.data-box .interval-box .interval-input').attr('max'));

		// Fallback Values If Min Or Max Are Not Valid Numbers
		if (!Number.isFinite(Minimum)) Minimum = -Infinity;
		if (!Number.isFinite(Maximum)) Maximum = Infinity;

		// Return True If Value Is Within Range, Otherwise False
		return InputNumber >= Minimum && InputNumber <= Maximum;
	}

	// Change Interval Status Function
	function ChangeIntervalStatus() {
		// Check If Interval Value Is Valid
		if (CheckIntervalValue()) {
			// Show Min Section If It Is Currently Hidden
			if ($('.data-box .interval-box .min-section').is(':hidden')) {
				$('.data-box .interval-box .min-section').stop(true, true).fadeIn(150);
			}
		} else {
			// Hide Min Section If It Is Currently Visible
			if ($('.data-box .interval-box .min-section').is(':visible')) {
				$('.data-box .interval-box .min-section').stop(true, true).fadeOut(150);
			}
		}
	}

	// Change Interval Minutes Function
	function ChangeIntervalMinutes(NUMBER) {
		// Get Current Value From Interval Input & Convert To Integer
		var Value = parseInt($('.data-box .interval-box .interval-input').val(), 10);
		if (isNaN(Value)) Value = 0;

		// Add The Given Number To Current Value
		Value += NUMBER;

		// Get Minimum & Maximum Values From Input Attributes
		var MinValue = parseInt($('.data-box .interval-box .interval-input').attr('min'), 10);
		var MaxValue = parseInt($('.data-box .interval-box .interval-input').attr('max'), 10);

		// Ensure Value Stays Within Allowed Range
		if (!isNaN(MinValue)) Value = Math.max(Value, MinValue);
		if (!isNaN(MaxValue)) Value = Math.min(Value, MaxValue);

		// Update Input Value & Trigger Input Event
		$('.data-box .interval-box .interval-input').val(Value).trigger('input');
	}

	// Get File Name Function
	function GetFileName(FileName) {
		// Get Request URL & Define File Name Variables
		var URL = $('.data-box .name-box .checkbox-section').attr('href');
		var FileNameSuffix = 'CHAPTERS';
		var GetFullFileName = FileName;
		var Result;

		// Show Loading Animation
		$('.data-box .name-box .loading-section').removeClass('show hide').addClass('show');

		// Check If Auto Name Option Is Enabled
		if ($('.data-box .name-box .autoname-input').is(':checked')) {
			// Send AJAX Request To Fetch Fixed File Name
			$.ajax({
				type: 'POST',
				url: URL,
				headers: {
					'X-CSRF-TOKEN': $('meta[name=csrf_token]').attr('content')
				},
				dataType: 'json',
				data: {
					'full_file_name': GetFullFileName
				},

				// Handle Successful Response
				success: function (ResultData) {
					var GetFixedFileName = ResultData['fixed_file_name'];

					// Hide Loading Animation & Enable Controls
					$('.data-box .name-box .loading-section').removeClass('show hide').addClass('hide');
					$('.data-box .name-box .autoname-input').prop('disabled', false);

					// Handle Case Where `Movie Name Was Not Found`
					if (GetFixedFileName === 'Movie Name NOT Found!') {
						Result = FileNameSuffix;
						$('.data-box .name-box .autoname-input').prop('checked', false);
						$('.data-box .name-box .filename-input').prop('disabled', false);
						$('.data-box .name-box .filename-input').val(Result).focus();
					} else {
						// Combine Fixed File Name With Suffix
						Result = GetFixedFileName + ' ' + FileNameSuffix;
						$('.data-box .name-box .filename-input').val(Result);
					}
				},

				// Handle AJAX Error Response
				error: function (ResultData) {
					var ErrorMessage = ResultData['responseJSON']['message'];

					// Reset UI When Error Modal Is Closed
					$('#ErrorModal').one('hidden.bs.modal', function () {
						$('.data-box .name-box .loading-section').removeClass('show hide').addClass('hide');
						$('.data-box .name-box .autoname-input').prop('disabled', false);
						$('.data-box .name-box .autoname-input').prop('checked', false);
						$('.data-box .name-box .filename-input').prop('disabled', false);
						$('.data-box .name-box .filename-input').val(FileNameSuffix).focus();
					});

					// Show Error Message Modal
					ShowMessage('AJAX Failed Unfortunately!<br>(' + ErrorMessage + ')', 'danger');
				}
			});
		}
	}

	// Fix Long File Name Function
	function FixLongFileName(FileName) {
		// Store Original File Name & Calculate Its Length
		var GetFileName = FileName;
		var GetLength = GetFileName.length;
		var Result;

		// Check If File Name Exceeds Maximum Length
		if (GetLength <= 40) {
			Result = GetFileName; // Keep Original If Within Limit
		} else {
			Result = GetFileName.slice(0, 40) + '...'; // Truncate & Add Ellipsis
		}

		// Return Processed File Name
		return Result;
	}

	// Check Video File Function
	function CheckVideoFile(FILE) {
		// Verify File Existence
		if (!FILE) return;

		// Check File Type By MIME
		var ByMime = FILE.type && FILE.type.startsWith('video/');

		// Check File Extension Pattern
		var ByExt = /\.(mp4|mkv|webm|mov|avi|wmv|flv|m4v|mpeg|mpg|3gp)$/i.test(FILE.name || '');

		// Return True If File Is A Valid Video Format
		return ByMime || ByExt;
	}

	// Time To Seconds Function
	function TimeToSeconds(TimeString) {
		// Split Time String Into Hours, Minutes, & Seconds
		var Parts = TimeString.split(':');

		// Parse Each Part As Integer Or Default To 0
		var Hours = parseInt(Parts[0], 10) || 0;
		var Minutes = parseInt(Parts[1], 10) || 0;
		var Seconds = parseInt(Parts[2], 10) || 0;

		// Convert Total Time To Seconds & Return Result
		return (Hours * 3600) + (Minutes * 60) + Seconds;
	}

	// Seconds To Time Function
	function SecondsToTime(SECONDS) {
		// Round Input Value & Prepare Total Seconds
		var Total = Math.round(SECONDS || 0);

		// Calculate Hours, Minutes, & Seconds
		var Hour = Math.floor(Total / 3600);
		Total %= 3600;
		var Minute = Math.floor(Total / 60);
		var Second = Total % 60;

		// Helper Function To Pad Numbers With Leading Zeros
		var PadNumber = N => String(N).padStart(2, '0');

		// Return Formatted Time String (HH:MM:SS)
		return PadNumber(Hour) + ':' + PadNumber(Minute) + ':' + PadNumber(Second);
	}

	// Minutes To Time Function
	function MinutesToTime(MINUTES) {
		// Convert Minutes To Total Seconds
		var Total = parseInt(MINUTES, 10) * 60;

		// Calculate Hours & Remaining Minutes
		var Hours = Math.floor(Total / 3600);
		var RemainingSeconds = Total % 3600;
		var Minutes = Math.floor(RemainingSeconds / 60);

		// Helper Function To Pad Numbers With Leading Zeros
		function Pad(Numbers) {
			return Numbers.toString().padStart(2, '0');
		}

		// Return Formatted Time String (HH:MM:00)
		return Pad(Hours) + ':' + Pad(Minutes) + ':00';
	}

	// Calculate Chapters Function
	function CalculateChapters(SmallTime, BigTime) {
		// Convert Input Times To Seconds
		var SmallSeconds = TimeToSeconds(SmallTime);
		var BigSeconds = TimeToSeconds(BigTime);

		// Validate That Both Inputs Are Not Empty
		if ($.trim(SmallTime) === '' || $.trim(BigTime) === '') {
			ShowMessage('One Of The Inputs Is Empty!', 'warning');
			return;
		}

		// Validate That Both Times Have Valid Positive Values
		if (SmallSeconds <= 0 || BigSeconds <= 0) {
			ShowMessage('Invalid Time Values! (VALID: HH:MM:SS)', 'danger');
			return;
		}

		// Ensure Small Time Is Not Greater Than Big Time
		if (SmallSeconds > BigSeconds) {
			ShowMessage('Small Time Is Bigger Than Big Time!', 'danger');
			return;
		}

		// Calculate & Return Total Number Of Chapters
		return Math.ceil(BigSeconds / SmallSeconds);
	}

	// Generate Video Data Function
	function GenerateVideoData(File) {
		return new Promise((resolve, reject) => {
			// Get Interval Value & Convert To Time & Seconds
			var IntervalValue = $('.data-box .interval-box .interval-input').val();
			var IntervalTime = MinutesToTime(IntervalValue);
			var IntervalSeconds = TimeToSeconds(IntervalTime);

			// Create Temporary Hidden Video Element
			var TempVideo = $('<video preload="metadata" class="d-none"></video>');
			var ObjectURL = URL.createObjectURL(File);
			TempVideo.attr('src', ObjectURL);

			// When Video MetaData Is Successfully Loaded
			TempVideo.on('loadedmetadata', function () {
				URL.revokeObjectURL(ObjectURL);
				var VideoDuration = this.duration;
				TempVideo.remove();

				// Extract & Process Video Information
				var GetFullName = EscapeHTML(File.name);
				var GetOnlyName = GetFullName.substring(0, GetFullName.lastIndexOf('.'));
				var GetFormat = GetFullName.split('.').pop().toUpperCase();
				var GetSize = (File.size / (1024 ** 3)).toFixed(2) + ' (GB)';
				var GetType = EscapeHTML(File.type.toUpperCase() || 'UNKNOWN');
				var GetChapterName = $('.data-box .chapter-box .chapter-input').val();
				var GetChapterLanguage = $('.data-box .lang-box .lang-input').val();

				// Convert Duration & Interval To Time Format
				var GetFullTime = SecondsToTime(VideoDuration);
				var GetIntervalTime = MinutesToTime(IntervalValue);

				// Calculate Total Chapters
				var GetCalculateChapters = CalculateChapters(GetIntervalTime, GetFullTime);
				var ChapterCount = Math.ceil(VideoDuration / IntervalSeconds);
				var Chapters = {};

				// Generate Chapter Data With Start & End Times
				for (var I = 0; I < ChapterCount; I++) {
					var ChapterName = GetChapterName + ' ' + String(I + 1).padStart(2, '0');
					var StartTime = SecondsToTime(I * IntervalSeconds) + '.000000000';
					var EndSeconds = (I + 1) * IntervalSeconds;
					if (EndSeconds > VideoDuration) EndSeconds = VideoDuration;
					var EndTime = SecondsToTime(EndSeconds) + '.000000000';
					Chapters[ChapterName] = [StartTime, EndTime];
				}

				// Create Final Result Object Containing All Video Data
				var Result = {
					'FileNameFull': GetFullName,
					'FileNameOnly': GetOnlyName,
					'FileFormat': GetFormat,
					'FileSize': GetSize,
					'MovieTime': GetFullTime,
					'MovieType': GetType,
					'MovieInterval': GetIntervalTime,
					'ChaptersLanguage': GetChapterLanguage,
					'ChaptersCount': GetCalculateChapters,
					'Chapters': Chapters
				};

				// Resolve Promise With JSON Result
				resolve(JSON.stringify(Result, null, 2));
				window.GetGlobalResult = Result;

				// Auto-Generate File Name If Enabled
				if ($('.data-box .name-box .autoname-input').is(':checked')) {
					GetFileName(Result['FileNameFull']);
				}

				// Update UI With Extracted Video Data
				$('.upload-box .result-section .upload-result .file-name').find('span').html(FixLongFileName(Result['FileNameOnly']));
				$('.upload-box .result-section .upload-result .file-format').find('span').html(Result['FileFormat']);
				$('.upload-box .result-section .upload-result .file-size').find('span').html(Result['FileSize']);
				$('.upload-box .result-section .upload-result .file-length').find('span').html(Result['MovieTime']);

				// Animate Transition From Upload Section To Result Section
				$('.upload-box .upload-section').fadeOut('slow', function () {
					$('.upload-box .result-section').fadeIn('slow', function () {
						$('.upload-box .result-section .remove-btn').fadeIn('slow');
					});
				});
			});

			// Handle Video MetaData Load Error
			TempVideo.on('error', function () {
				URL.revokeObjectURL(ObjectURL);
				TempVideo.remove();
				ShowMessage('Failed To Read Video Information!<br>(The Format May Not Be Supported)', 'danger');
				reject(new Error('Failed To Read Video MetaData!'));
			});

			// Append Temporary Video Element To Body
			$('body').append(TempVideo);
		});
	}

	// Handle Video File Function
	async function HandleVideoFile(File) {
		// Check If The Selected File Is A Valid Video
		if (!CheckVideoFile(File)) {
			ShowMessage('This File Is Not A Video File!', 'danger');
			$('.upload-box .file-input').val('');
			return;
		}

		// Attempt To Generate Video Data
		try {
			// Generate All Video Data Using The Given File
			var FullData = await GenerateVideoData(File);

			// Store The Selected File Globally For Further Access
			window.SelectedVideoFile = File;
		} catch (Error) {
			// Display Error Message If File Processing Fails
			ShowMessage('Error While Reading Video File!', 'danger');
			return;
		}
	}

	// Generate Random Unique ID Function
	function GenerateRandomUID() {
		// Initialize Static State Object If Not Already Defined
		if (!GenerateRandomUID._State) {
			GenerateRandomUID._State = {
				LastTimeStamp: 0,
				Counter: 0
			};
		}

		// Get Current State Reference
		var State = GenerateRandomUID._State;

		// Get Current Timestamp As String
		var CurrentTimeStamp = Date.now().toString();

		// Check If The Timestamp Is The Same As The Previous One
		if (CurrentTimeStamp === String(State.LastTimeStamp)) {
			// Increase Counter If Timestamp Did Not Change
			State.Counter = (State.Counter + 1) % 1000;
		} else {
			// Reset Counter & Update Last Timestamp
			State.LastTimeStamp = CurrentTimeStamp;
			State.Counter = 0;
		}

		// Format Counter To Always Have 3 Digits
		var CounterPart = String(State.Counter).padStart(3, '0');

		// Calculate Remaining Length For Random Digits
		var RemainingLength = 20 - (CurrentTimeStamp.length + CounterPart.length);

		// Generate Random Number To Fill The Remaining Length
		var RandomNumber = Math.floor(Math.random() * Math.pow(10, RemainingLength));
		var RandomPart = String(RandomNumber).padStart(RemainingLength, '0');

		// Combine All Parts & Ensure Final UID Is 20 Characters
		var FinalUID = (CurrentTimeStamp + CounterPart + RandomPart).slice(-20);

		// Return The Final Unique Identifier
		var Result = FinalUID;

		return Result;
	}

	// Beautify XML Function
	function BeautifyXML(XML) {
		// Define Variables For Formatting
		var Padded = '';
		var REG = /(>)(<)(\/*)/g;
		var PADDING = '\t';

		// Add Line Breaks Between Tags
		XML = XML.replace(REG, '$1\r\n$2$3');

		// Split XML Into Separate Lines
		var Lines = XML.split('\r\n');
		var Indent = 0;

		// Process Each Line & Apply Proper Indentation
		$.each(Lines, function (Index, Line) {
			var LineMatch;

			// Handle Tags That Open & Close On The Same Line
			if (Line.match(/.+<\/\w[^>]*>$/)) {
				Padded += PADDING.repeat(Indent) + Line + '\r\n';

				// Handle Closing Tags
			} else if (Line.match(/^<\/\w/)) {
				if (Indent > 0) Indent -= 1;
				Padded += PADDING.repeat(Indent) + Line + '\r\n';

				// Handle Opening Tags
			} else if (Line.match(/^<\w[^>]*[^\/]>.*$/)) {
				Padded += PADDING.repeat(Indent) + Line + '\r\n';
				Indent += 1;

				// Handle Other Lines (Text Or Self-Closing Tags)
			} else {
				Padded += PADDING.repeat(Indent) + Line + '\r\n';
			}
		});

		// Trim Extra Spaces & Return Beautified XML
		var Result = Padded.trim();

		return Result;
	}

	// Generate XML Function
	function GenerateXML() {
		// Initialize XML Variable
		var XML;

		// Define Random UID Generator Reference
		var RandomUID = GenerateRandomUID;

		// Get Movie Data From Global Object
		var MovieData = window.GetGlobalResult;

		// Extract & Split Chapter Languages
		var ChaptersLanguage = MovieData['ChaptersLanguage'].split(',');
		var ChaptersLanguage2Chars = ChaptersLanguage[0];
		var ChaptersLanguage3Chars = ChaptersLanguage[1];

		// Convert Chapters Object To Iterable Entries
		var Chapters = Object.entries(MovieData['Chapters']);

		// Start Building XML Structure
		XML = '<?xml version="1.0" encoding="UTF-8"?>';
		XML += '<!-- <!DOCTYPE Chapters SYSTEM "matroskachapters.dtd"> -->';
		XML += '<Chapters>';
		XML += '<EditionEntry>';
		XML += '<EditionFlagHidden>0</EditionFlagHidden>';
		XML += '<EditionFlagDefault>1</EditionFlagDefault>';
		XML += '<EditionUID>' + RandomUID() + '</EditionUID>';

		// Loop Through Each Chapter & Build Its XML Entry
		Chapters.forEach(function ([TITLE, TIMES]) {
			var ChapterTitle = TITLE;
			var ChapterTimes = TIMES;
			var ChapterStartTime = ChapterTimes[0];
			var ChapterEndTime = ChapterTimes[1];

			// Add Chapter Structure To XML
			XML += '<ChapterAtom>';
			XML += '<ChapterUID>' + RandomUID() + '</ChapterUID>';
			XML += '<ChapterTimeStart>' + ChapterStartTime + '</ChapterTimeStart>';
			XML += '<ChapterFlagHidden>0</ChapterFlagHidden>';
			XML += '<ChapterFlagEnabled>1</ChapterFlagEnabled>';
			XML += '<ChapterTimeEnd>' + ChapterEndTime + '</ChapterTimeEnd>';
			XML += '<ChapterDisplay>';
			XML += '<ChapterString>' + ChapterTitle + '</ChapterString>';
			XML += '<ChapterLanguage>' + ChaptersLanguage3Chars + '</ChapterLanguage>';
			XML += '<ChapLanguageIETF>' + ChaptersLanguage2Chars + '</ChapLanguageIETF>';
			XML += '</ChapterDisplay>';
			XML += '</ChapterAtom>';
		});

		// Close XML Structure
		XML += '</EditionEntry>';
		XML += '</Chapters>';

		// Beautify Final XML Output
		var Result = BeautifyXML(XML);

		return Result;
	}

	// Download XML Function
	function DownloadXML(XML, FileName = 'file.xml') {
		// Create A Blob Object From The XML Content
		var BlobObject = new Blob([XML], {
			type: 'application/xml;charset=utf-8'
		});

		// Generate A Temporary URL For The Blob
		var URLObject = URL.createObjectURL(BlobObject);

		// Create A Hidden Download Link Element
		var DownloadLink = $('<a>').attr({
			href: URLObject,
			download: FileName
		}).css('display', 'none').appendTo('body');

		// Trigger The Download Programmatically
		DownloadLink[0].click();

		// Remove The Temporary Link Element
		DownloadLink.remove();

		// Revoke The Temporary Object URL To Free Memory
		URL.revokeObjectURL(URLObject);
	}

	/* ===================================================================/FUNCTIONS =================================================================== */

	// Initialize Bootstrap Tooltip Elements
	$('[data-bs-toggle="tooltip"]').tooltip({
		trigger: 'hover'
	});

	// Initialize Interval Status
	ChangeIntervalStatus();

	// Prevent Default Browser Behavior
	$(document).on('dragover dragenter drop', function (EVENT) {
		EVENT.preventDefault();
		EVENT.stopPropagation();
	});

	// Validate Interval Input Value (Only Numbers Between 1-1000)
	$('.data-box .interval-box .interval-input').on('input', function () {
		// Get & Clean Input Value
		var Value = $(this).val();
		var Number = parseInt(Value, 10);
		Value = Value.replace(/-/g, '');

		// Validate Numeric Input
		if (isNaN(Number)) {
			$(this).val('');
			return;
		}

		// Clamp Value Between 1 & 1000
		if (Number < 1) Number = 1;
		if (Number > 1000) Number = 1000;

		// Update Input Field With Sanitized Value
		$(this).val(Number);
	});

	// Update Interval Status On Input Or Blur
	$('.data-box .interval-box .interval-input').on('input blur', ChangeIntervalStatus);

	// Increase Interval Value By 5 Minutes
	$('.data-box .interval-box .increase-btn').on('click', function () {
		ChangeIntervalMinutes(5);
	});

	// Decrease Interval Value By 5 Minutes
	$('.data-box .interval-box .decrease-btn').on('click', function () {
		ChangeIntervalMinutes(-5);
	});

	// Trigger File Input When Upload Section Is Clicked
	$('.upload-box .upload-section').on('click', function () {
		$('.upload-box .file-input').trigger('click');
	});

	// Handle Dragover & Dragenter Events For Upload Section
	$('.upload-box .upload-section').on('dragover dragenter', function (EVENT) {
		// Prevent Default Browser Behavior
		EVENT.preventDefault();
		EVENT.stopPropagation();

		// Retrieve Data Transfer Object
		var DataTransfer = EVENT.originalEvent.dataTransfer;

		// Add Visual Highlight For Dragover State
		$('.upload-box .upload-section').addClass('dragover');

		// Set Drop Effect To "Copy" For Better UX
		if (DataTransfer) DataTransfer.dropEffect = 'copy';
	});

	// Remove Dragover Style When Drag Leaves Or Ends
	$('.upload-box .upload-section').on('dragleave dragend', function (EVENT) {
		// Prevent Default Browser Behavior
		EVENT.preventDefault();
		EVENT.stopPropagation();

		// Remove Dragover Visual Highlight
		$('.upload-box .upload-section').removeClass('dragover');
	});

	// Handle File Drop Event
	$('.upload-box .upload-section').on('drop', function (EVENT) {
		// Prevent Default Browser Behavior
		EVENT.preventDefault();
		EVENT.stopPropagation();

		// Remove Dragover Visual State
		$('.upload-box .upload-section').removeClass('dragover');

		// Get Dropped Files & Find A Valid Video File
		var Files = EVENT.originalEvent.dataTransfer.files;
		var File = [...Files].find(CheckVideoFile);

		// Validate File Drop
		if (!Files || !Files.length) return;
		if (Files.length > 1) {
			ShowMessage('Please Drag/Drop Only One Video File!', 'warning'); // Warn If Multiple Files Dropped
			return;
		}

		// Process Or Reject Dropped File
		if (File) {
			HandleVideoFile(File); // Handle Valid Video File
		} else {
			ShowMessage('Only Video Files Are Allowed!', 'danger'); // Show Error For Invalid File Type
		}
	});

	// Handle File Selection From File Input
	$('.upload-box .file-input').on('change', function () {
		// Get Selected File & Check If Exists
		var File = this.files && this.files[0];
		var FileLength = $(this)[0].files.length;

		// Validate File Selection
		if (FileLength > 0) {
			if (File) {
				HandleVideoFile(File); // Process The Selected Video File
			} else {
				$(this).val(''); // Reset Input If No Valid File Found
			}
		}
	});

	// Handle Auto-Name Checkbox Behavior
	$('.data-box .name-box .autoname-input').on('change', function () {
		// Get Selected File & Movie Data From Global Variables
		var File = window.SelectedVideoFile;
		var MovieData = window.GetGlobalResult;
		var FileName;

		// If Checkbox Is Checked
		if ($(this).is(':checked')) {
			// Validate That A File & Movie Data Exist
			if (!File || !MovieData) {
				// Uncheck Checkbox & Enable Manual Filename Input
				$(this).prop('checked', false);
				$('.data-box .name-box .filename-input').prop('disabled', false);

				// Show Warning Message To Select A File First
				ShowMessage('Please Select Or Drag/Drop A Video File First!', 'warning');
			} else {
				// Get Auto-Generated File Name From Movie Data
				FileName = MovieData['FileNameFull'];

				// Apply The Auto-Generated File Name To Input
				GetFileName(FileName);

				// Disable Both Inputs (Auto-Name & Filename)
				$('.data-box .name-box .autoname-input').prop('disabled', true);
				$('.data-box .name-box .filename-input').prop('disabled', true);
			}
		}
		// If Checkbox Is Unchecked, Enable Filename Input
		else {
			$('.data-box .name-box .filename-input').prop('disabled', false);
		}
	});

	// Detect Language Input Change & Update Style
	$('.data-box .lang-box .lang-input').on('change', function () {
		$('.data-box .lang-box .lang-input').removeClass('has-value has-not-value').addClass('has-value');
	});

	// Load Language Options From JSON File
	$.getJSON('files/others/languages.json', function (DATA) {
		// Get Language Select Element & Clear Existing Options
		var SelectElement = $('.data-box .lang-box .lang-input');
		SelectElement.empty();

		// Loop Through Language Data & Create Option Elements
		$.each(DATA, function (INDEX, ITEM) {
			var OptionElement = $('<option>', {
				value: ITEM.value,
				text: ITEM.text
			});

			// Set English As Default Selected Language
			if (ITEM.value === 'en,eng') OptionElement.attr('selected', 'selected');

			// Append Option To The Select Element
			SelectElement.append(OptionElement);
		});

		// Mark Language Input As Having A Valid Value
		$('.data-box .lang-box .lang-input').removeClass('has-value has-not-value').addClass('has-value');
	});

	// Handle Remove Button Click (Clear Results & Reset Upload Section)
	$('.upload-box .result-section .remove-btn').click(function () {
		// Fade Out Remove Button
		$(this).fadeOut('fast', function () {
			// Fade Out Result Section After Button Hides
			$('.upload-box .result-section').fadeOut('slow', function () {
				// Fade In Upload Section Again
				$('.upload-box .upload-section').fadeIn('slow');

				// Clear All Displayed File Information
				$('.upload-box .result-section .upload-result .file-name').find('span').html('');
				$('.upload-box .result-section .upload-result .file-format').find('span').html('');
				$('.upload-box .result-section .upload-result .file-size').find('span').html('');
				$('.upload-box .result-section .upload-result .file-length').find('span').html('');

				// Reset Input Values & Global Variables
				$('.upload-box .file-input').val('');
				$('.data-box .name-box .filename-input').val('');
				window.GetGlobalResult = '';
				window.SelectedVideoFile = '';
			});
		});
	});

	// Handle Generate Button Click (Validate Inputs & Generate XML File)
	$('.button-box .generate-btn').click(async function () {
		var File = window.SelectedVideoFile;
		var GetIntervalValue = $('.data-box .interval-box .interval-input').val();
		var GetChapterName = $('.data-box .chapter-box .chapter-input').val();
		var GetChapterLanguage = $('.data-box .lang-box .lang-input').val();
		var GetFileName = $('.data-box .name-box .filename-input').val();

		// Validate Required Inputs Before Generation
		if (!File) {
			ShowMessage('Please Select Or Drag/Drop A Video File First!', 'warning');
			return;
		}
		if (GetIntervalValue == '') {
			ShowMessage('Please Enter A Valid Split Time In Minutes!<br>(VALID: HH:MM:SS)', 'warning');
			return;
		}
		if (GetChapterName == '') {
			ShowMessage('Please Enter A Chapter Name!', 'warning');
			return;
		}
		if (GetChapterLanguage == '') {
			ShowMessage('Please Select A Chapter Language Name!', 'warning');
			return;
		}
		if (GetFileName == '') {
			ShowMessage('Please Enter Or Confirm A File Name!', 'warning');
			return;
		}

		// Disable Generate Button To Prevent Multiple Clicks
		$('.button-box .generate-btn').prop('disabled', true);

		// Attempt To Generate XML File
		try {
			await GenerateVideoData(File); // Recalculate Video Data Before XML
			var GetXML = GenerateXML(); // Create XML Content
			var FileName = GetFileName + '.xml'; // Define Download File Name
			DownloadXML(GetXML, FileName); // Download XML File
			ShowMessage('XML Generated Successfully!', 'success'); // Show Success Message
		} catch (Error) {
			// Handle Generation Failure
			ShowMessage('Failed To Generate XML!', 'danger');
			$('.button-box .generate-btn').prop('disabled', false);
			return;
		}
	});

	// Handle Reset Button Click (Restore Default Settings)
	$('.button-box .reset-btn').click(function () {
		// Clear Global Variables
		window.GetGlobalResult = '';
		window.SelectedVideoFile = '';

		// Reset Error Modal Content
		$('#ErrorModal .modal-body').html('');

		// Restore Default Input Values
		$('.data-box .interval-box .interval-input').val('10').trigger('input');
		$('.upload-box .file-input').val('');
		$('.data-box .chapter-box .chapter-input').val('Chapter');
		$('.data-box .lang-box .lang-input option[value="en,eng"]').prop('selected', true).change();
		$('.data-box .name-box .filename-input').val('CHAPTERS');

		// Enable & Uncheck Name Inputs
		$('.data-box .name-box .filename-input').prop('disabled', false);
		$('.data-box .name-box .autoname-input').prop('disabled', false);
		$('.data-box .name-box .autoname-input').prop('checked', false);

		// Hide Loading Section & Re-Enable Generate Button
		$('.data-box .name-box .loading-section').removeClass('show hide').addClass('hide');
		$('.button-box .generate-btn').prop('disabled', false);

		// Hide Or Reset Upload Result Section
		if ($('.upload-box .result-section').is(':visible')) {
			$('.upload-box .result-section').fadeOut('slow', function () {
				// Show Upload Section Again
				$('.upload-box .upload-section').fadeIn('slow');

				// Clear Result Display Fields
				$('.upload-box .result-section .upload-result .file-name').find('span').html('');
				$('.upload-box .result-section .upload-result .file-format').find('span').html('');
				$('.upload-box .result-section .upload-result .file-size').find('span').html('');
				$('.upload-box .result-section .upload-result .file-length').find('span').html('');

				// Hide Remove Button
				$('.upload-box .result-section .remove-btn').hide();
			});
		} else {
			// If Result Section Is Already Hidden, Just Clear Text Fields
			$('.upload-box .result-section .upload-result .file-name').find('span').html('');
			$('.upload-box .result-section .upload-result .file-format').find('span').html('');
			$('.upload-box .result-section .upload-result .file-size').find('span').html('');
			$('.upload-box .result-section .upload-result .file-length').find('span').html('');
		}
	});
});