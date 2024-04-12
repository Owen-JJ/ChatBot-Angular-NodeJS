import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBotV2Component } from './chat-bot-v2.component';

describe('ChatBotV2Component', () => {
  let component: ChatBotV2Component;
  let fixture: ComponentFixture<ChatBotV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
