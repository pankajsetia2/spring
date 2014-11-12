<h1>
	Reward an Account for Dining
</h1>

<form id="diningForm" method="post">
	<fieldset> 
		<legend>
			Dining Information
		</legend>
		<ul>
			<li>
				<label for="creditCardNumber">
					Credit Card
				</label>
				<div class="control">
					<input id="creditCardNumber" name="creditCardNumber" type="text" />
				</div>
			</li>
			<li>
				<label for="merchantNumber">
					Restaurant
				</label>
				<div class="control">
					<select id="merchantNumber" name="merchantNumber">
						<option value="1">Applebees</option>
						<option value="2">Subway</option>
					</select>
				</div>
			</li>
			<li>
				<label for="amount">
					Dining Amount
				</label>
				<div class="control">
					<input id="amount" name="amount" type="text" />
				</div>
			</li>
			<li>
				<label for="date">
					Dining Date
				</label>
				<div class="control">
					<input id="date" name="date" type="text" value="2009-01-20" />
				</div>
			</li>
		</ul>
		
		<button type="submit">
			Reward
		</button>
		
	</fieldset>
</form>