// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

AuditRules.addRule({
    name: 'controlsWithoutLabel',
    severity: Severity.Severe,
    relevantNodesSelector: function() {
        var controlsSelector = ['input:not([type="hidden"]):not([disabled])',
                                'select:not([disabled])',
                                'textarea:not([disabled])',
                                'button:not([disabled])'].join(', ');
        return this.auditscope_.querySelectorAll(controlsSelector);
    },
    test: function(control) {
        if (AccessibilityUtils.isElementOrAncestorHidden(control))
            return false;

        if (control.tagName.toLowerCase() == 'button') {
            var innerText = control.innerText.replace(/^\s+|\s+$/g, '');
            if (innerText.length)
                return false;
        }

        if (!AccessibilityUtils.hasLabel(control))
            return true;

        return false;
    },
    code: 'AX_TEXT_01',
    ruleName: 'Controls should have labels',
    resultsDetails: 'Unlabelled controls may not be useable for users of assistive technology.',
    url: 'https://code.google.com/a/google.com/p/accessibility-developer-tools/wiki/AuditRules#AX_TEXT_01:_Controls_should_have_labels'
});
